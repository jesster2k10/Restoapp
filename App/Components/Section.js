import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

const Section = ({ children, padding, top, bottom, left, right, end, center, full, column, style, bottomAlign }) => {
    return (
        <View style={
            [{
                paddingLeft: padding || left,
                paddingRight: padding || right,
                paddingBottom: padding || bottom,
                paddingTop: padding || top,
                alignItems: end ? 'flex-end' : center ? 'center' : 'flex-start',
                flexDirection: column ? 'column' : 'row',
                justifyContent: bottomAlign ? 'flex-end' : null
            }, full ? { flex: 1 } : {}, style]
        }>
            { children }
        </View>
    );
};

export { Section };