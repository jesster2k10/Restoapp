/**
 * Created by jesseonolememen on 18/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import {
    Text
} from 'native-base';
import {
    NavigationButton
} from '../Components';
import strings from '../Config/Localization';
import { paymentForm } from './Styles/SelectCardScreenStyles';
import { SelectPayment } from 'react-native-checkout';

class SelectCardScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.selectPaymentMethod,
        headerLeft: <NavigationButton navigation={navigation} back />,
    });

    _selectPayment = (paymentSource) => {
        console.log(paymentSource);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <SelectPayment
                paymentSources={[
                    {last4: '1234', brand: 'American Express', more: 'stuff' },
                    {last4: '2345', brand: 'Visa', more: 'stuff' },
                    {last4: '2345', brand: 'Master Card', more: 'stuff' },
                ]} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
                addCardHandler={() => this.props.navigation.goBack()}
                selectPaymentHandler={this._selectPayment.bind(this)}
                styles={paymentForm} // Override default styles
            />
        )
    };
}

export default connect(null, {})(SelectCardScreen);