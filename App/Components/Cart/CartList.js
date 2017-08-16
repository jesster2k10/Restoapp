import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import { getCart } from '../../Actions/CartActions';
import { getCart as getSavedCart } from '../../Helpers'
import { connect } from 'react-redux';
import {
    CartItem
} from '../../Components';

class CartList extends Component {
    _keyExtractor = (item, index) => item._id;

    _renderItem({ item }) {
        return <CartItem meal={item} />
    }

    render() {
        return (
            <FlatList
                data={this.props.products}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={this._keyExtractor}
            />
        )
    };
}

const mapStateToProps = ({ cart }) => {
    let products = [];

    if (cart.cart.products != undefined) {
        products = [...cart.cart.products.reduce( (mp, o) => {
            if (!mp.has(o._id)) mp.set(o._id, Object.assign({ count: 0 }, o));
            mp.get(o._id).count++;
            return mp;
        }, new Map).values()];
    }


    return {
        cart: cart.cart,
        products: products
    }
};

export default connect(mapStateToProps, { getCart })(CartList);