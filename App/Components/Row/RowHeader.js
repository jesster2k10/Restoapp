/**
 * Created by jesseonolememen on 15/08/2017.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {
    Center
} from '../../Components';
import {
    applyLetterSpacing
} from '../../Helpers';
import styles from './Styles/RowHeaderStyles';

const _render = (children, center, capital, style, textStyle) => {
    if (center) {
        return (
            <Center>
                <Text style={[styles.title, textStyle, { textAlign: center ? 'center' : 'left' }]}>{ capital ? applyLetterSpacing(children.toUpperCase(), 5) : applyLetterSpacing(children, 5) }</Text>
            </Center>
        );
    } else {
        return (
            <Text style={[styles.title, textStyle]}>{ capital ? applyLetterSpacing(children.toUpperCase(), 5) : applyLetterSpacing(children, 5) }</Text>
        )
    }
};

const RowHeader = ({ children, center, capital, style, textStyle }) => {
    return (
        <View style={styles.container}>
            { _render(children, center, capital, style, textStyle) }
        </View>
    );
};

export default RowHeader;