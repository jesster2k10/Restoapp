import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    Grid,
    Col
} from 'react-native-easy-grid';
import styles from './Styles/RowStyles';

const Row = ({ title, body }) => {
    return (
        <View style={styles.row}>
            <Grid>
                <Col>
                    <Text style={styles.medium}>{ title }</Text>
                </Col>
                <Col style={styles.end}>
                    <Text style={styles.body}>{ body }</Text>
                </Col>
            </Grid>
        </View>
    );
};

export { Row };