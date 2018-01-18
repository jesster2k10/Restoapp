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
    getProductsForApplePay,
    getSubtotalWithoutCountAsInt,
    getFirstName,
    getLastName,
} from '../../Helpers';
import {
    selectPaymentType,
    confirmPayment,
    makePayment,
    createCustomer,
    chargeCustomer,
    getPaymentCards,
    makeCashPayment,
    changePage,
    makeBraintreePayment,
} from '../../Actions';
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
import UserReducer from '../../Reducers/UserReducer';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    Images,
    ApplicationStyles
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
import Spinner from 'react-native-spinkit';
import * as Animatable from 'react-native-animatable';
import Toast, { DURATION } from 'react-native-easy-toast'

const {
    APPLE_PAY,
    PAYPAL,
    CREDIT_CARD,
    ANDROID_PAY,
    CASH,
} = Constants.PAYMENT_TYPES;

class PaymentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceSpecificPaymentButton: null,
            loading: false
        };

        this.hasSentPaymentNotification = false;
    }

    componentWillMount() {
        this.props.confirmPayment(false);
    }

    componentWillReceiveProps({ changePage, makePaymentsSuccess, makePaymentsError, makePaymentsLoading, createOrderSuccess, createOrderError, createOrderLoading, createOrder, order, placedOrder }) {
        if (!this.hasSentPaymentNotification && makePaymentsSuccess && !makePaymentsError && !makePaymentsLoading) {

        } else if (!makePaymentsSuccess && !makePaymentsLoading && makePaymentsError) {
            this.refs.toast.show(makePaymentsError, DURATION.LENGTH_LONG);
        } else if (!createOrderSuccess && !createOrderLoading && createOrderError) {
            this.refs.toast.show(createOrderError, DURATION.LENGTH_LONG);
        }

        if (!this.hasSentPaymentNotification && createOrderSuccess && !createOrderLoading && !createOrderError && placedOrder) {
            this.hasSentPaymentNotification = true;
            console.log('crate order success');
            changePage(2);
            window.EventBus.trigger(Constants.EVENTS.MAKE_PAYMENT_SUCCESS);
        } else {
            this.refs.toast.show(createOrderError, DURATION.LENGTH_LONG);
        }
    }

    async _addCardHandler(cardNumber, cardExpiry, cardCvc) {
        const { token, subtotal, currency, makePayment, customer, isUserLoggedIn, order } = this.props;

        let params = {
            number: cardNumber,
            expMonth: Number(cardExpiry.split('/')[0]),
            expYear: Number(cardExpiry.split('/')[1]),
            cvc: cardCvc
        };

        try {
            let tokenId = await stripe.createTokenWithCard(params);

            if (token && isUserLoggedIn && customer) {
                chargeCustomer(tokenId.tokenId, customer, Math.round(subtotal*1000), currency, order)
            } else {
                makePayment(tokenId.tokenId, token, Math.round(subtotal*1000), currency, order);
            }

        } catch (error) {
            this.refs.toast.show(error.message, DURATION.LENGTH_LONG);
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
            case CASH:
                return strings.cash;
            default:
                return "";
        }
    };

    async _pay() {
        const {
            paymentType,
            products,
            currency,
            token,
            subtotal,
            order,
            makeBraintreePayment,
            makeCashPayment,
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
                    stripe.completeApplePayRequest();
                } catch (e) {
                    stripe.cancelApplePayRequest();
                }

                break;

            case PAYPAL:
                this.setState({ loading: true });

                try {
                    let nonce = await BTClient.showPayPalViewController();
                    makeBraintreePayment(nonce, token, subtotal, order);
                } catch (error) {
                    this.refs.toast.show(error.message, DURATION.LENGTH_LONG);
                } finally {
                    this.setState({ loading: false });
                }

                break;

            case CASH:
                makeCashPayment(order, token || Constants.ACCESS_TOKEN);
                return;
        }
    };

    _renderPaymentForm = () => {
        const {
            paymentType,
            makePaymentsLoading,
            customer,
            token,
            paymentCards,
            createOrderLoading,
        } = this.props;

        if (makePaymentsLoading || createOrderLoading || this.state.loading) {
            let text = createOrderLoading ? strings.creatingOrder : strings.makingPayment;

            return (
                <View style={styles.centeredContainer}>
                    <Spinner
                        isVisible
                        size={17}
                        type='Arc'
                        color='white'/>
                    <Text style={styles.loader}>{ text }</Text>
                </View>
            )
        }

        if (paymentType == CREDIT_CARD) {
            let selectOtherCard = customer && token && paymentCards ?
                <Section bottom={25}>
                    <Animatable.View  style={styles.container} ref="form">
                        <_Row title={strings.usePreviousMethod} body={strings.selectCard} big disclosure first action={() => this.props.navigation.navigate('SelectCard')} />
                    </Animatable.View>
                </Section> : null;

            return (
                <Animatable.View style={styles.container} ref="form">
                    { selectOtherCard }
                    <AddCard
                        ref={(addCard) => { this.addCard = addCard; }}
                        styles={cardFormStyles}
                        addCardHandler={this._addCardHandler.bind(this)}
                        activityIndicatorColor="white"
                        />
                </Animatable.View>
            )
        }

        if (paymentType == CASH) {
            return (
                <Animatable.View style={styles.container}>
                    <_Row title={strings.payWithCash} colOneSize={0.3} colTwoSize={0.7} body={strings.payWithCashMessage} big disclosure first action={this._pay.bind(this)} />
                </Animatable.View>
            );
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
                                { /* this.state.deviceSpecificPaymentButton */ }
                                <Col>
                                    <Button block style={paymentType === CASH ? styles.selectedButton : styles.paymentButton} onPress={() => selectPaymentType(CASH)}>
                                        <Icon name='ios-cash' style={paymentType === CASH ? styles.selectedIcon : styles.icon} />
                                    </Button>
                                </Col>
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
                <Toast
                    ref="toast"
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}/>
            </Animatable.View>
        )

    };
}

const mapStateToProps = ({ checkout, cart, auth, payments, user, shippingForm, orders }) => {
    const name = {
        first: getFirstName(shippingForm.name),
        last: getLastName(shippingForm.name),
    };

    const address = {
        street1: shippingForm.address,
        suburb: shippingForm.city,
        state: shippingForm.state,
        postcode: shippingForm.zip,
        country: Constants.COUNTRY.NAME,
    };
    const order = {
        ordererName: name,
        billingName: name,
        billingAddress: address,
        deliveryAddress: address,
        total: Math.round(getSubtotalWithoutCountAsInt(cart.cart), 2),
        orderDate: Date.now(),
        orderNote: checkout.order_note,
        products: cart.cart.products.map(({ _id }) => _id),
        user: user.currentUser ? user.currentUser._id : null,
        type: checkout.delivery_method,
        paymentType: payments.type,
        currency: getCurrency(cart.cart, false),
    };

    return {
        paymentType: checkout.payment_type,
        products: getProductsForApplePay(cart.cart),
        currency: getCurrency(cart.cart, false),
        cost: getSubtotalWithoutCount(cart.cart),
        subtotal: getSubtotalWithoutCountAsInt(cart.cart),
        billingAddress: checkout.billing_address,
        token: auth.token,
        customer: payments.customer,
        createCustomerSuccess: payments.create_customer_success,
        createCustomerError: payments.create_customer_error,
        createCustomerLoading: payments.create_customer_loading,
        makePaymentsSuccess: payments.make_payment_success,
        makePaymentsError: payments.make_payment_error,
        makePaymentsLoading: payments.make_payment_loading,
        createOrderSuccess: orders.create_order_success,
        createOrderError: orders.create_order_error,
        createOrderLoading: orders.create_order_loading,
        isUserLoggedIn: auth.userLoggedIn,
        paymentCards: payments.payment_cards,
        placedOrder: orders.placedOrder,
        order,
    }
};

const actions = {
    selectPaymentType,
    confirmPayment,
    makePayment,
    createCustomer,
    chargeCustomer,
    makeBraintreePayment,
    makeCashPayment,
    changePage,
};

export default connect(mapStateToProps, actions)(PaymentForm);