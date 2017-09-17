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
    KeyboardAvoidingView
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
    PaymentForm
} from '../Components';
import { changePage } from '../Actions/CheckoutActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import strings from '../Config/Localization';
import styles from './Styles/CheckoutScreenStyles';

class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.checkout,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} action={() => { CheckoutScreen._info() }} size={24} icon="ios-help-buoy-outline" />,
    });

    static _info() {
        console.log('Help')
    };

    _goToPayment = () => {
        const {
            canConfirmShipping
        } = this.props;

        if (canConfirmShipping) {
            this.props.changePage(1);
            this.tabView.goToPage(1);
        } else {
            alert('Please make sure all fields are entered correctly.')
        }
    };


    _goToConfirm = () => {
        const {
            canConfirmPayment
        } = this.props;

        if (canConfirmPayment) {
            this.props.changePage(2);
            this.tabView.goToPage(2);
        } else {
            alert('Please make sure all fields are entered correctly.')
        }
    };

    render() {

        return (
            <Container>
                <ScrollableTabView
                    locked
                    renderTabBar={() => <IconTabBar noChange />}
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
                                <ShippingForm/>
                            </View>
                        </KeyboardAwareScrollView>

                        <View style={styles.buttonContainer}>
                            <Button full style={styles.button} onPress={() => this._goToPayment()}>
                                <Text style={styles.buttonTitle}>{ strings.nextPaymentInfo }</Text>
                            </Button>
                        </View>
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
                        <View style={styles.buttonContainer}>
                            <Button full style={styles.button} onPress={() => this._goToConfirm()}>
                                <Text style={styles.buttonTitle}>{ strings.confirmPayment }</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.container} tabLabel={`ios-done-all-outline,${strings.confirm}`}>
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