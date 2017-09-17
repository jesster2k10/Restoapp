/**
 * Created by jesseonolememen on 16/08/2017.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Platform,
    NativeModules
} from 'react-native';
import {
    connect
} from 'react-redux';
import {
    getCurrency,
    getSubtotalWithoutCount,
    getProductsForApplePay
} from '../../Helpers';
import {
    selectPaymentType,
    confirmPayment,
} from '../../Actions/CheckoutActions';
import {
    Text,
    Icon,
    Button
} from 'native-base';
import {
    Section,
    RowHeader,
    Row as _Row
} from '../../Components';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    Images,
} from '../../Themes';
import Constants from '../../Config/Constants';
import {
    styles,
    cardFormStyles,
} from './Styles/PaymentFormStyles';
import strings from '../../Config/Localization';
import stripe from 'tipsi-stripe';
import { AddCard } from 'react-native-checkout';
import BTClient from 'react-native-braintree-xplat';
import * as Animatable from 'react-native-animatable';

const {
    APPLE_PAY,
    PAYPAL,
    CREDIT_CARD,
    ANDROID_PAY
} = Constants.PAYMENT_TYPES;

class PaymentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceSpecificPaymentButton: null
        }
    }

    componentWillMount() {
        this.props.confirmPayment(false);
    }

    async _addCardHandler(cardNumber, cardExpiry, cardCvc) {
        let expArr = cardExpiry.split('/');
        let params = {
            number: cardNumber,
            expMonth: Number(expArr[0]),
            expYear: Number(expArr[1]),
            cvc: cardCvc
        };

        try {
            let token = await stripe.createTokenWithCard(params);
            console.log(`Got stripe token: ${token}`);
        } catch (error) {
            console.log(`Error getting stripe token: ${error}`)
        }

        return Promise.resolve(cardNumber);
    };

    _title = () => {
        switch (this.props.paymentType) {
            case APPLE_PAY:
                return strings.applePay;
            case PAYPAL:
                return strings.paypal;
            case CREDIT_CARD:
                return strings.card;
            case ANDROID_PAY:
                return strings.androidPay;
            default:
                return "";
        }
    };

    async _pay() {
        const {
            paymentType,
            products,
            currency,
        } = this.props;


        switch (paymentType) {
            case APPLE_PAY:
                let options = {
                    requiredBillingAddressFields: 'all',
                    requiredShippingAddressFields: 'all',
                    shippingType: 'delivery',
                    currency
                };

                try {
                    let token = await stripe.paymentRequestWithApplePay(products, options);
                    console.log('Completed pay request', token);
                    stripe.completeApplePayRequest();
                } catch (e) {
                    console.log('caught error', e);
                    stripe.cancelApplePayRequest();
                }

                break;

            case PAYPAL:
                console.log(PAYPAL);

                BTClient.showPayPalViewController().then(function(nonce) {
                    //payment succeeded, pass nonce to server
                    console.log(nonce)
                }).catch(function(err) {
                        //error handling
                    console.log(err)
                });
                break;
        }
    };

    _renderPaymentForm = () => {
        const {
            paymentType
        } = this.props;

        if (paymentType == CREDIT_CARD) {
            return (
                <Animatable.View style={styles.container} ref="form">
                    <Section bottom={25}>
                        <Animatable.View  style={styles.container} ref="form">
                            <_Row title={strings.usePreviousMethod} body={strings.selectCard} big disclosure first action={() => this.props.navigation.navigate('SelectCard')} />
                        </Animatable.View>
                    </Section>
                    <AddCard
                        ref={(addCard) => { this.addCard = addCard; }}
                        styles={cardFormStyles}
                        addCardHandler={this._addCardHandler.bind(this)}
                        />
                </Animatable.View>
            )
        }

        if (paymentType == PAYPAL) {
            return (
                <Animatable.View style={styles.container} ref="form">
                    <_Row title={strings.account} body={strings.chooseAnAccount} big disclosure first action={this._pay.bind(this)} />
                </Animatable.View>
            )
        }

        if (paymentType == APPLE_PAY) {
            return (
                <Animatable.View  style={styles.container} ref="form">
                    <_Row title={strings.applePay} body={strings.continuePayment} big disclosure first action={this._pay.bind(this)} />
                </Animatable.View>
            )
        }

        if (paymentType == ANDROID_PAY) {
            return (
                <Animatable.View style={styles.container} ref="form">
                    <_Row title={strings.androidPay} body={strings.continuePayment} big disclosure first action={() => this._pay.bind(this)} />
                </Animatable.View>
            )
        }
    };

    _setDeviceSpecificPaymentButton = () => {
        const {
            selectPaymentType,
            paymentType
        } = this.props;

        let applePayButton = (
            <Col>
                <Button block style={paymentType === APPLE_PAY ? styles.selectedButton : styles.paymentButton} onPress={() => selectPaymentType(APPLE_PAY)}>
                    <Image resizeMode="contain" style={paymentType === APPLE_PAY ? styles.selectedPaymentIcon : styles.paymentIcon} source={Images.applePay} />
                </Button>
            </Col>
        );

        let androidButton = (
            <Col>
                <Button block style={paymentType === ANDROID_PAY ? styles.selectedButton : styles.paymentButton} onPress={() => selectPaymentType(ANDROID_PAY)}>
                    <Image resizeMode="contain" style={paymentType === ANDROID_PAY ? styles.selectedPaymentIcon : styles.paymentIcon} source={Images.applePay} />
                </Button>
            </Col>
        );

        if (Platform.OS == "ios") {
            NativeModules.ApplePayManager.canDeviceUserApplePay()
                .then(canMakePayments => {
                    if (canMakePayments) {
                        this.setState({ deviceSpecificPaymentButton: applePayButton });
                    } else {
                        this.setState({ deviceSpecificPaymentButton: null });
                    }
                });
        } else {
            stripe.deviceSupportsAndroidPay()
                .then(canMakePayments => {
                    if (canMakePayments) {
                        this.setState({ deviceSpecificPaymentButton: androidButton });
                    } else {
                        this.setState({ deviceSpecificPaymentButton: null })
                    }
                });
        }

        return null;
    };

    render() {
        const {
            selectPaymentType,
            paymentType,
        } = this.props;

        this._setDeviceSpecificPaymentButton();

        return (
            <Animatable.View ref="root">
                <Section>
                    <Grid>
                        <Section left={10} right={10} bottom={15}>
                            <Row size={1}>
                                { this.state.deviceSpecificPaymentButton }
                                <Col>
                                    <Button block style={paymentType === PAYPAL ? styles.selectedButton : styles.paymentButton} onPress={() => selectPaymentType(PAYPAL)}>
                                        <Image resizeMode="contain" style={paymentType === PAYPAL ? styles.selectedPaymentIcon : styles.paymentIcon} source={Images.payPal} />
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block style={paymentType === CREDIT_CARD ? styles.selectedButton : styles.paymentButton} onPress={() => selectPaymentType(CREDIT_CARD)}>
                                        <Icon name='ios-card' style={paymentType === CREDIT_CARD ? styles.selectedIcon : styles.icon} />
                                    </Button>
                                </Col>
                            </Row>
                        </Section>
                        <Row size={9}>
                            <View style={styles.column}>
                                <Section top={5} bottom={15}>
                                    <RowHeader capital center>{ this._title() }</RowHeader>
                                </Section>
                                { this._renderPaymentForm() }
                            </View>
                        </Row>
                    </Grid>
                </Section>
            </Animatable.View>
        )

    };
}

const mapStateToProps = ({ checkout, cart }) => {
    return {
        paymentType: checkout.payment_type,
        products: getProductsForApplePay(cart.cart),
        currency: getCurrency(cart.cart, false),
        cost: getSubtotalWithoutCount(cart.cart),
        billingAddress: checkout.billing_address
    }
};

const actions = {
    selectPaymentType,
    confirmPayment,
};

export default connect(mapStateToProps, actions)(PaymentForm);