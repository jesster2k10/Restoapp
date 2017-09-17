/**
 * Created by jesseonolememen on 23/08/2017.
 */

import React, {Component} from 'react';
import {
    Text,
    Button
} from 'native-base';
import styles from './Styles/TextButtonStyles';

const TextButton = ({ children, onPress, textStyle, buttonStyle, full = true }) => {
    return (
        <Button transparent onPress={onPress} style={buttonStyle} full={full}>
            <Text style={[styles.text, textStyle]}>{ children }</Text>
        </Button>
    );
};

export default TextButton;