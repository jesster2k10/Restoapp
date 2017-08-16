/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const Center = ({ children, vert, horz }) => {
    return (
        <View style={{ alignItems: horz ? 'center' : null, justifyContent: vert ? 'center': null }}>
            { children }
        </View>
    );
};

export default Center;