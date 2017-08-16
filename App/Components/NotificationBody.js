/**
 * Created by jesseonolememen on 12/08/2017.
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    Text,
} from 'react-native';
import  {
    Grid,
    Col,
} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/NotificationBodyStyles';

const NotificationBody = ({ title, error, onPress, onClose }) => {
    return (
        <TouchableOpacity style={[styles.root, { backgroundColor: error ? 'red' : 'black' }]} onPress={onPress}>
            <View style={[styles.container, { paddingBottom: 5 }]}>
                <Grid>
                    <Col size={1} style={styles.alignStart}>
                        <Icon size={20} color='white' name='ios-notifications-outline' />
                    </Col>
                    <Col size={8}>
                        {title ? <Text style={[styles.text, styles.bold]}>{title}</Text> : null}
                    </Col>
                    <Col size={1} style={styles.alignEnd}>
                        <TouchableHighlight activeOpacity={0.3} underlayColor="transparent" onPress={onClose}>
                            <Icon size={20} color='white' name='ios-close-outline'/>
                        </TouchableHighlight>
                    </Col>
                </Grid>
            </View>
        </TouchableOpacity>
    );
};

export { NotificationBody };