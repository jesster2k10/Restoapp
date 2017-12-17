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
import {
    isiPhoneX
} from '../../Helpers';

const SubmitButton = ({ title, onPress, loading, children, height, width, custom }) => {
    let body = children && custom ? children : loading ?
        <Spinner
            isVisible
            size={17}
            type='Arc'
            color='white'/> : <Text style={styles.buttonTitle}>{ title }</Text>;
    return (
        <Button block style={[styles.button, { height: height ? height : isiPhoneX() ? 75 : 55 }, { width: width || null }]} onPress={onPress}>
            {body}
        </Button>
    );
}

export default SubmitButton;