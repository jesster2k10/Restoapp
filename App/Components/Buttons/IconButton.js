import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Button,
    Text
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Styles/IconButtonStyles';

const renderIcon = (icon, iconColor, fontawesome) => {
    if (fontawesome) {
        return <Icon name={icon} size={20} color={iconColor || 'white'} />
    } else {
        return <MaterialIcons name={icon} size={20} color={iconColor || 'white'} />
    }
};

const IconButton = ({ onPress, children, backgroundColor, iconBackgroundColor, icon, iconColor, fontawesome }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, { backgroundColor: backgroundColor || 'blue' }]}>
                <View style={[styles.iconBackground, { backgroundColor: iconBackgroundColor || 'skyblue' }]}>
                    { renderIcon(icon, iconColor, fontawesome) }
                </View>
                <View style={[styles.button, { backgroundColor: backgroundColor || 'blue' } ]}>
                    <Text style={styles.title}>{ children }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


export { IconButton };