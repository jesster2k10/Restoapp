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
import Spinner from 'react-native-spinkit';
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

const renderBody = (loading, children, iconColor) => {
    if (loading) {
        return <Spinner isVisible size={15} type='Arc' color={iconColor} />
    } else {
        return <Text style={styles.title}>{ children }</Text>
    }
};


const IconButton = ({ onPress, loading, children, backgroundColor, iconBackgroundColor, icon, iconColor, fontawesome }) => {
    let body = loading ? <Spinner isVisible size={15} type='Arc' color='white' /> : <Text style={styles.title}>{ loading ? null : children }</Text>;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, { backgroundColor: backgroundColor || 'blue' }]}>
                <View style={[styles.iconBackground, { backgroundColor: iconBackgroundColor || 'skyblue' }]}>
                    { renderIcon(icon, iconColor, fontawesome) }
                </View>
                <View style={[styles.button, { backgroundColor: backgroundColor || 'blue' } ]}>
                    { body }
                </View>
            </View>
        </TouchableOpacity>
    );
};


export { IconButton };