import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
} from 'native-base';
import {
    Grid,
    Col
} from 'react-native-easy-grid';
import {
    Colours,
} from '../../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/RowStyles';

const _renderDisclosure = (disclosure) => {
    if (disclosure) {
        return (
            <Col size={1} style={styles.end}>
                <Icon name='ios-arrow-forward-outline' color="white" size={17} />
            </Col>
        )
    }
};

const _renderIcon = (icon) => {
    if (icon) {
        return (
            <Icon style={styles.icon} name={icon} color="white" size={17} />
        )
    }
};

const Row = ({ title, style, noTouch, body, big, disclosure, bodyStyle, titleStyle, first, action, colOneSize, colTwoSize, icon }) => {
    return (
        <TouchableOpacity onPress={!noTouch ? action : null} activeOpacity={noTouch ? 0 : 0.5}>
            <View style={[big ? styles.bigRow : styles.row, { borderTopWidth: first ? 0.5 : 0 }, style]}>
                <Grid style={[{ backgroundColor: Colours.lighterBody, justifyContent: 'center' }]}>
                    <Col size={colOneSize || 5} style={styles.title}>
                        { _renderIcon(icon) }
                        <Text style={styles.medium}>{ title }</Text>
                    </Col>
                    <Col style={[styles.end, bodyStyle, styles.bodyCol]} size={colTwoSize || 5}>
                        <Grid>
                            <Col size={9} style={[styles.end, bodyStyle]}>
                                <Text minimumFontScale={0.5} style={styles.body}>{ body }</Text>
                            </Col>
                            { _renderDisclosure(disclosure) }
                        </Grid>
                    </Col>
                </Grid>
            </View>
        </TouchableOpacity>
    );
};

export { Row };