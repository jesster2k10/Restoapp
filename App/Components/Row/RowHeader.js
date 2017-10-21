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

const _render = (children, center, capital, style, textStyle, spacing) => {
    if (center) {
        return (
            <Center>
                <Text style={[styles.title, textStyle, { textAlign: center ? 'center' : 'left' }]}>{ capital ? applyLetterSpacing(children.toUpperCase(), spacing) : applyLetterSpacing(children, spacing) }</Text>
            </Center>
        );
    } else {
        return (
            <Text style={[styles.title, textStyle]}>{ capital ? applyLetterSpacing(children.toUpperCase(), spacing) : applyLetterSpacing(children, spacing) }</Text>
        )
    }
};

const RowHeader = ({ children, center, capital, style, textStyle, spacing }) => {
    return (
        <View style={[ styles.container, style]}>
            { _render(children, center, capital, style, textStyle, spacing) }
        </View>
    );
};

export default RowHeader;