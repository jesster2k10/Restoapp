/**
 * Created by jesseonolememen on 15/08/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Alert,
    Linking,
    Platform,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
    Icon,
    Text,
    Container,
    Button,
} from 'native-base';
import {
    IconTabBar,
    NavigationButton,
    RowHeader,
    Section,
    ShippingForm,
    PaymentForm,
    CheckoutConfirmation
} from '../Components';
import {
    Colours,
    ApplicationStyles
} from '../Themes';
import Mailer from 'react-native-mail';
import { changePage } from '../Actions/CheckoutActions';
import { geoCodeAddress } from '../Actions/FormActions';
import { resetCart } from '../Actions/CartActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ActionSheet from '@yfuks/react-native-action-sheet';
import strings from '../Config/Localization';
import styles from './Styles/CheckoutScreenStyles';
import Constants from '../Config/Constants';
import Toast, { DURATION } from 'react-native-easy-toast';

class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.checkout,
        headerLeft: <NavigationButton navigation={navigation} size={24} icon="ios-close-outline" action={() => navigation.dispatch(NavigationActions.back())} />,
        headerRight: <NavigationButton navigation={navigation} action={() => { CheckoutScreen._info() }} size={24} icon="ios-help-buoy-outline" />,
    });

    componentDidMount() {
        window.EventBus.on(Constants.EVENTS.MAKE_PAYMENT_SUCCESS, this._goToConfirm.bind(this));
        window.EventBus.on(Constants.EVENTS.INFO_NAV_BUTTON_PRESS, this._showInfoActionSheet);
        this.hasntAreadyChangedToConfirm = false;
    }

    componentWillReceiveProps({
        geoCodeSuccess,
        geoCodeLocation,
        geoCodeError,
        geoCodeLoading,
        selectedPage,
        paymentSuccess,
        paymentError,
        paymentLoading,
        createOrderLoading,
        createOrderError,
        createOrderSuccess,
    }) {
        if (geoCodeSuccess && geoCodeLocation && !geoCodeError && !geoCodeLoading && selectedPage === 0) {
            const {
                changePage
            } = this.props;

            changePage(1);
        } else {
            if (geoCodeError && !geoCodeSuccess && !geoCodeLocation && !geoCodeLoading && selectedPage == 0) {
                this.refs.toast.show(geoCodeError, DURATION.LENGTH_LONG);
            }

            if (paymentError && !paymentSuccess && !paymentLoading && selectedPage == 1) {
                this.refs.toast.show(paymentError, DURATION.LENGTH_LONG);
            }

            if (createOrderError && !createOrderSuccess && !createOrderLoading && selectedPage == 2) {
                this.refs.toast.show(createOrderError, DURATION.LENGTH_LONG);
            }
        }
    }

    static _info() {
        window.EventBus.trigger(Constants.EVENTS.INFO_NAV_BUTTON_PRESS);
    };

    _showInfoActionSheet = () => {
        ActionSheet.showActionSheetWithOptions({
                title: strings.contactSupport,
                message: strings.chooseContactMethod,
                options: [strings.emailSupport, strings.callSupport, strings.cancel],
                cancelButtonIndex: 2,
                tintColor: Colours.darkBody
            }, (idx) => {
                if (idx == 0) {
                    this._mailSupport();
                }

                if (idx == 1) {
                    Linking.openURL(`tel:${Constants.PHONE}`);
                }
            }
        );
    };

    _mailSupport = () => {
        Mailer.mail({
            subject: 'Checkout Support',
            recipients: [Constants.SUPPORT_EMAIL],
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    { text: strings.ok },
                    { text: strings.cancel }
                ],
                { cancelable: true }
            )
        });
    };

    _goToPayment = () => {
        const {
            canConfirmShipping,
            changePage,
        } = this.props;

        if (canConfirmShipping) {
            const {
                geoCodeLocation,
                geoCodeError,
                geoCodeLoading,
                geoCodeSuccess,
                geoCodeAddress,
                address,
                city,
                postcode,
            } = this.props;

            if (geoCodeLocation && !geoCodeError && !geoCodeLoading && geoCodeSuccess) {
                changePage(1)
            } else {
                geoCodeAddress(address, postcode, city);
            }
        } else {
            Alert.alert(
                strings.invalidFields,
                strings.checkAgainForInvalidFields,
                [
                    {
                        text: strings.ok
                    },
                ],
                {
                    cancelable: true
                }
            )
        }
    };

    _goBack = () => {
        this.props.navigation.dispatch(
            {
                type: 'Navigation/NAVIGATE',
                routeName: 'MenuNavigator',
                action: {
                    type: 'Navigation/NAVIGATE',
                    routeName: 'Menu',
                }
            }
        );

        this.props.resetCart(this.props.token, this.props.cart);
    };

    _nextPaymentInfo = () => {
        const {
            canConfirmShipping,
        } = this.props;

        if (canConfirmShipping) {
            return (
                <View style={styles.buttonContainer}>
                    <Button full style={styles.button} onPress={() => this._goToPayment()}>
                        <Text style={styles.buttonTitle}>{ strings.nextPaymentInfo }</Text>
                    </Button>
                </View>
            )
        } else {
            return <View style={styles.buttonContainer}>
                <Button full style={styles.badButton} onPress={() => alert(strings.checkForErrors)}>
                    <Text style={styles.badButtonTitle}>{ strings.checkForErrors }</Text>
                </Button>
            </View>
        }
    };


    _goToConfirm = () => {
        const {
            canConfirmPayment,
            changePage,
        } = this.props;

        if (canConfirmPayment && !this.hasntAreadyChangedToConfirm) {
            changePage(2);
            this.hasntAreadyChangedToConfirm = true;
        }
    };

    render() {
        const {
            canConfirmShipping,
            selectedPage,
        } = this.props;

        return (
            <Container>
                <ScrollableTabView
                    renderTabBar={() => <IconTabBar noChange />}
                    locked
                    page={selectedPage}
                    ref={(tabView) => { this.tabView = tabView; }}
                >
                    <View style={styles.container} tabLabel={`ios-pin-outline,${strings.delivery}`}>
                        <KeyboardAwareScrollView extraHeight={Platform.os === 'ios' ? 200 : 250} style={styles.container}>
                            <View style={styles.container}>
                                <Section top={20} left={20} right={20}>
                                    <RowHeader capital center>
                                        { strings.shippingAddress }
                                    </RowHeader>
                                </Section>
                                <ShippingForm navigation={this.props.navigation} />
                            </View>
                        </KeyboardAwareScrollView>
                        { this._nextPaymentInfo() }
                    </View>
                    <View style={styles.container} tabLabel={`ios-card-outline,${strings.payment}`}>
                        <ScrollView style={styles.container}>
                            <KeyboardAvoidingView>
                                <Section top={20} bottom={15}>
                                    <RowHeader capital center>{ strings.payingWith }</RowHeader>
                                </Section>
                                <PaymentForm navigation={this.props.navigation} />
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                    <View style={styles.container} tabLabel={`ios-done-all-outline,${strings.confirm}`}>
                        <CheckoutConfirmation navigation={this.props.navigation} />
                        <View style={styles.buttonContainer}>
                            <Button full style={styles.button} onPress={() => this._goBack()}>
                                <Text style={styles.buttonTitle}>{ strings.finish }</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollableTabView>
                <Toast
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}
                    ref="toast" />
            </Container>
        )
    };
}

const mapStateToProps = ({ checkout, auth, shippingForm, orders, payments, cart }) => ({
    selectedPage: checkout.page,
    canConfirmPayment: checkout.can_confirm_payment,
    canConfirmShipping: shippingForm.valid,
    geoCodeLocation: shippingForm.geo_code_location,
    geoCodeSuccess: shippingForm.geo_code_success,
    geoCodeLoading: shippingForm.geo_code_loading,
    geoCodeError: shippingForm.geo_code_error,
    paymentSuccess: payments.make_payment_success,
    paymentError: payments.make_payment_error,
    paymentLoading: payments.make_payment_loading,
    createOrderLoading: orders.create_order_loading,
    createOrderError: orders.create_order_error,
    createOrderSuccess: orders.create_order_success,
    address: shippingForm.address,
    city: shippingForm.city,
    postcode: shippingForm.zip,
    cart: cart.cart._id,
    token: auth.token,
});

export default connect(mapStateToProps, { changePage, geoCodeAddress, resetCart })(CheckoutScreen);