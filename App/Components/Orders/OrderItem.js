/**
 * Created by jesseonolememen on 21/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Button
} from 'native-base';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    getPrice,
    getSubtotal
} from '../../Helpers';
import {
    Images,
    Colours
} from '../../Themes';
import strings from '../../Config/Localization';
import styles from './Styles/OrderItemStyles';
import dateformat from 'dateformat';

const getColor = (status) => {
    switch (status) {
        case 'Completed':
            return Colours.ribbon.background;
        case 'Delivered':
            return Colours.ribbon.background;
        case 'Cancelled':
            return Colours.accent;
        case 'Failed':
            return Colours.accent;
    }
};

const renderOrderNote = ({ orderNote }) => {
    if (orderNote != undefined && orderNote.length > 0) {
        return (
            <View>
                <Text style={styles.note}>{ orderNote }</Text>
            </View>
        )
    }
};

const OrderItem = ({ order, navigation }) => {
    const {
        status,
        orderDate,
        transaction
    } = order;

    let products = order.products || [];
    let mappedProducts = products.map((item, i) => {
        return (
            <View style={styles.detailContainer} key={item._id || i}>
                <View style={styles.col}>
                    <Text style={styles.items}>{`x${item.count} `}</Text>
                    <Text style={styles.items}>{ item.name }</Text>
                </View>
                <View style={styles.end}>
                    <Text style={styles.items}>{ getPrice(item) }</Text>
                </View>
            </View>
        )
    });

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Grid>
                        <Col>
                            <Text style={styles.date}>{ dateformat(new Date(orderDate), "dd mmmm yyyy") }</Text>
                        </Col>
                        <Col>
                            <View style={styles.alignEnd}>
                                <Text style={[styles.price, { color: getColor(status) }]}>{ status }</Text>
                            </View>
                        </Col>
                    </Grid>
                </View>
                { renderOrderNote(order) }
                <View style={styles.itemContainer}>
                    { mappedProducts }
                </View>
                <View style={styles.priceContainer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>{ getSubtotal(order) }</Text>
                    </View>
                    <View style={styles.paymentButtonContainer}>
                        <Button style={styles.paymentButton}>
                            <Image resizeMode="contain" style={styles.paymentIcon} source={Images.applePay} />
                        </Button>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

OrderItem.defaultProps = {
    order: {
        items: []
    }
};

export default OrderItem;