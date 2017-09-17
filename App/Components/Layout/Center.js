/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const Center = ({ children, vert = true, horz = true, full }) => {
    return (
        <View style={{ alignItems: horz ? 'center' : null, justifyContent: vert ? 'center': null , flex: full ? 1 : null }}>
            { children }
        </View>
    );
};

export default Center;