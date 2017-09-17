/**
 * Created by jesseonolememen on 16/08/2017.
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    Image
} from 'react-native';
import Payment from 'payment';
import FlipCard from 'react-native-flip-card';
import styles from './Styles/CreditCardInputStyles';

const validate = Payment.fns;

class CreditCardInput extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>CreditCardInput</Text>
            </View>
        )
    };
}

export default CreditCardInput;