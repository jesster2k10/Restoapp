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
    Alert
} from 'react-native';
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
    Colours
} from '../Themes';
import Mailer from 'react-native-mail';
import { changePage } from '../Actions/CheckoutActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ActionSheet from '@yfuks/react-native-action-sheet';
import strings from '../Config/Localization';
import styles from './Styles/CheckoutScreenStyles';
import Constants from '../Config/Constants';

class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.checkout,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} action={() => { CheckoutScreen._info() }} size={24} icon="ios-help-buoy-outline" />,
    });

    componentDidMount() {
        window.EventBus.on(Constants.EVENTS.MAKE_PAYMENT_SUCCESS, this._goToConfirm.bind(this));
        window.EventBus.on(Constants.EVENTS.INFO_NAV_BUTTON_PRESS, this._showInfoActionSheet);
    }

    static _info() {
        window.EventBus.trigger(Constants.EVENTS.INFO_NAV_BUTTON_PRESS);
    };

    _showInfoActionSheet = () => {
        const { navigate } = this.props.navigation;

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
                    console.log('CAll Support');
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
            changePage
        } = this.props;

        if (canConfirmShipping) {
            this.tabView.goToPage(1);
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


    _goToConfirm = () => {
        const {
            canConfirmPayment,
        } = this.props;

        console.log(this)

        if (canConfirmPayment) {
            this.tabView.goToPage(2);
        }
    };

    render() {
        const {
            selectedPage,
            canConfirmShipping
        } = this.props;

        let nextPaymentInfo = canConfirmShipping ?
            <View style={styles.buttonContainer}>
                <Button full style={styles.button} onPress={() => this._goToPayment()}>
                    <Text style={styles.buttonTitle}>{ strings.nextPaymentInfo }</Text>
                </Button>
            </View> : null;

        return (
            <Container>
                <ScrollableTabView
                    renderTabBar={() => <IconTabBar noChange />}
                    locked
                    ref={(tabView) => { this.tabView = tabView; }}
                >
                    <View style={styles.container} tabLabel={`ios-pin-outline,${strings.delivery}`}>
                        <KeyboardAwareScrollView extraScrollHeight={150} style={styles.container}>
                            <View style={styles.container}>
                                <Section top={20} left={20} right={20}>
                                    <RowHeader capital center>
                                        { strings.shippingAddress }
                                    </RowHeader>
                                </Section>
                                <ShippingForm navigation={this.props.navigation} />
                            </View>
                        </KeyboardAwareScrollView>
                        { nextPaymentInfo }
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
                    </View>
                </ScrollableTabView>
            </Container>
        )
    };
}

const mapStateToProps = ({ checkout, shippingForm }) => ({
    selectedPage: checkout.page,
    canConfirmPayment: checkout.can_confirm_payment,
    canConfirmShipping: shippingForm.valid
});

export default connect(mapStateToProps, { changePage })(CheckoutScreen);