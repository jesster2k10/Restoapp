import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Badge,
    Text
} from 'native-base';
import {
    getCart
} from '../../Actions/CartActions';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/NavigationButtonStyles';

function handleAction ({ navigate, goBack }, back, cart, action, route) {
    if (back) {
        if (route) {
            console.log(route);
            goBack({ key: route });
            return;
        }

        goBack();
        return;
    }

    if (action != undefined) {
        action();
        return
    }

    if (cart) {
        navigate('Cart');
        return;
    }

    navigate('DrawerOpen');
}

const getIcon = (back, cart, icon) => {
    if (back && !icon) {
        return 'ios-arrow-round-back-outline';
    }

    if (cart) {
        return 'ios-cart-outline';
    }

    if (icon) {
        return icon;
    }

    return 'ios-menu-outline';
};

const renderBadge = (cart, productCount) => {
    if (cart && productCount > 0) {
        return (
            <View style={styles.badgeContainer}>
                <Badge style={styles.badge}>
                    <Text style={styles.badgeText}>{ productCount }</Text>
                </Badge>
            </View>
        )
    }
};

const getSize = (back, size, cart) => {
    if (back) return 30;
    if (cart) return 25;
    if (size) return size;
};

const NavigationButton = ({back, navigation, cart, productCount, action, icon, route, size }) => {
    return (
        <TouchableOpacity onPress={() => handleAction(navigation, back, cart, action, route)}>
            <View style={styles.container}>
                { renderBadge(cart, productCount) }
                <Icon style={styles.icon} size={getSize(back, size, cart)} name={getIcon(back, cart, icon)} color='white' />
            </View>
        </TouchableOpacity>
    );
};

const mapStateToProps = ({ cart }) => {
    let count = 0;

    if (cart.cart) {
        if (cart.cart.products) {
            count = cart.cart.products.length
        }
    }

    return {
        productCount: count
    }
};

export default connect(mapStateToProps, {})(NavigationButton);