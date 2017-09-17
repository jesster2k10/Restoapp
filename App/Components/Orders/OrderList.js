/**
 * Created by jesseonolememen on 21/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import {
    Text,
} from 'native-base';
import {
    OrderItem
} from '../../Components';
import {
    Colours
} from '../../Themes';
import {
    getOrders
} from '../../Actions/OrderActions';
import {
    ApplicationStyles
} from '../../Themes';
import Spinner from 'react-native-spinkit';
import Toast, { DURATION } from 'react-native-easy-toast';
import styles from  './Styles/OrderListStyles';
import strings from '../../Config/Localization';

class OrderList extends Component {
    componentWillMount() {
        const { token, userId, getOrders } = this.props;
        getOrders(token, userId);
    }
    componentWillReceiveProps({ error }) {
        if (error) {
            this.refs.toast.show(error, DURATION.LENGTH_LONG);
        }
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem = ({ item }) => {
        return <OrderItem order={item} navigation={this.props.navigation} />
    };

    _renderOrderList = () => {
        const { orders, loading, error, userLoggedIn } = this.props;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner color={Colours.mainTextColor} size={17} type='Arc' />
                </View>
            )
        }

        let str = userLoggedIn ? strings.formatString(strings.nothing, strings.ordersLowercase) : strings.formatString(strings.loginNothing, strings.ordersLowercase);

        if (orders.length < 1) {
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{ str }</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={orders}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
            )
        }
    };

    render() {
        return (
            <View>
                { this._renderOrderList() }
                <Toast
                    ref="toast"
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}/>
            </View>
        )
    }
}

const mapStateToProps = ({ orders, auth }) => ({
    orders: orders.orders,
    loading: orders.loading,
    error: orders.error,
    token: auth.token,
    userId: auth.userId,
    userLoggedIn: auth.userLoggedIn
});

const actions = {
    getOrders
};

export default connect(mapStateToProps, actions)(OrderList);