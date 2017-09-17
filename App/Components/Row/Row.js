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

const Row = ({ title, body, big, disclosure, first, action, colOneSize, colTwoSize, icon }) => {
    return (
        <TouchableOpacity onPress={action}>
            <View style={[big ? styles.bigRow : styles.row, { borderTopWidth: first ? 0.5 : 0 }]}>
                <Grid>
                    <Col size={colOneSize || 5} style={styles.rowAlign}>
                        { _renderIcon(icon) }
                        <Text style={styles.medium}>{ title }</Text>
                    </Col>
                    <Col style={styles.end} size={colTwoSize || 5}>
                        <Grid style={styles.end}>
                            <Col size={9} style={styles.end}>
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