/**
 * Created by jesseonolememen on 21/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
    Button
} from 'native-base';
import Spinner from 'react-native-spinkit';
import styles from './Styles/SubmitButtonStyles';

const SubmitButton = ({ title, onPress, loading }) => {
    let body = loading ?
        <Spinner
            isVisible
            size={17}
            type='Arc'
            color='white'/> : <Text style={styles.buttonTitle}>{ title }</Text>;
    return (
        <Button block style={styles.button} onPress={onPress}>
            {body}
        </Button>
    );
}

export default SubmitButton;