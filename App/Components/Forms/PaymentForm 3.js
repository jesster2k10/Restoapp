/**
 * Created by jesseonolememen on 16/08/2017.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import {
    connect
} from 'react-redux';
import {
    selectPaymentType,
    setCardNumberTintColor,
} from '../../Actions/CheckoutActions';
import {
    Text,
    Icon,
    Button
} from 'native-base';
import {
    Section,
    RowHeader
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
import { AddCard } from 'react-native-checkout';

const {
    APPLE_PAY,
    PAYPAL,
    CREDIT_CARD
} = Constants.PAYMENT_TYPES;

class PaymentForm extends Component {
    _addCardHandler = (cardNumber, cardExpiry, cardCvc) => {
        console.log(`${cardNumber} ${cardExpiry} ${cardCvc}`);
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
            default:
                return "";
        }
    };

    _renderPaymentForm = () => {
        const {
            paymentType
        } = this.props;

        if (paymentType == CREDIT_CARD) {
            return (
                <View style={styles.container}>
                    <AddCard
                        ref={(addCard) => { this.addCard = addCard; }}
                        styles={cardFormStyles}
                        addCardHandler={this._addCardHandler}
                        />
                </View>
            )
        }
    };

    render() {
        const {
            selectPaymentType
        } = this.props;

        return (
            <Section>
                <Grid>
                    <Section left={10} right={10} bottom={15}>
                        <Row size={1}>
                            <Col>
                                <Button block style={styles.paymentButton} onPress={() => selectPaymentType(APPLE_PAY)}>
                                    <Image resizeMode="contain" style={styles.paymentIcon} source={Images.applePay} />
                                </Button>
                            </Col>
                            <Col>
                                <Button block style={styles.paymentButton} onPress={() => selectPaymentType(PAYPAL)}>
                                    <Image resizeMode="contain" style={styles.paymentIcon} source={Images.payPal} />
                                </Button>
                            </Col>
                            <Col>
                                <Button block style={styles.paymentButton} onPress={() => selectPaymentType(CREDIT_CARD)}>
                                    <Icon name='ios-card' style={styles.icon} />
                                </Button>
                            </Col>
                        </Row>
                    </Section>
                    <Row size={9}>
                        <Section top={25} bottom={15}>
                            <RowHeader capital center>{ this._title() }</RowHeader>
                        </Section>
                        { this._renderPaymentForm() }
                    </Row>
                </Grid>
            </Section>
        )
    };
}

const mapStateToProps = ({ checkout }) => ({
    paymentType: checkout.payment_type,
});

const actions = {
    setCardNumberTintColor,
};

export default connect(mapStateToProps, actions)(PaymentForm);