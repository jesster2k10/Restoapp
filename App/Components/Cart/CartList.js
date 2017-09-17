import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import { getCart, removeMealFromCart, addMealToCart, clearRemoveErrors } from '../../Actions/CartActions';
import { connect } from 'react-redux';
import {
    CartItem
} from '../../Components';
import {
    ApplicationStyles
} from '../../Themes';
import styles from './Styles/CartListStyles';
import strings from '../../Config/Localization';
import Spinner from 'react-native-spinkit';
import Toast, { DURATION } from  'react-native-easy-toast';

class CartList extends Component {
    componentWillMount() {
        this.props.getCart(this.props.id);
    }

    componentWillReceiveProps({ removeLoading, removeError, removeSuccess, clearRemoveErrors }) {
        if (!removeLoading && removeError && !removeSuccess) {
            this.refs.toast.show(removeError, DURATION.LENGTH_LONG);
            clearRemoveErrors();
        }
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem({ item }) {
        const { token, id, removeMealFromCart, addMealToCart, navigation } = this.props;

        return (
            <CartItem
                meal={item}
                navigation={navigation}
                deleteAction={() => removeMealFromCart(token, id, item)}
                onQuantityIncreased={() => addMealToCart(id, item)}
                onQuantityDecreased={() => removeMealFromCart(token, id, item)}
            />
        )
    }

    _renderList = () => {
        const { loading, products } = this.props;

        if (!loading && products.length > 0) {
            return (
                <FlatList
                    data={products}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
            )
        }

        if (loading) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner color='white' size={17} type="Arc" />
                </View>
            )
        }

        if (!products || products.length < 1) {
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{ strings.emptyCart }</Text>
                </View>
            )
        }
    };

    render() {
        return (
            <View>
                { this._renderList() }
                <Toast
                    ref="toast"
                    position='top'
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}/>
            </View>
        )
    };
}

const mapStateToProps = ({ cart, auth }) => {
    let products = [];

    if (cart.cart) {
        if (cart.cart.products != undefined) {
            products = [...cart.cart.products.reduce( (mp, o) => {
                if (!mp.has(o._id)) mp.set(o._id, Object.assign({ count: 0 }, o));
                mp.get(o._id).count++;
                return mp;
            }, new Map).values()];
        }
    }

    return {
        cart: cart.cart,
        products: products,
        id: cart.cart_saved_identifier,
        loading: cart.cart_loading,
        token: auth.token,
        removeLoading: cart.remove_meal_from_cart_loading,
        removeError: cart.remove_meal_from_cart_error,
        removeSuccess: cart.remove_meal_from_cart_success
    }
};

export default connect(mapStateToProps, { getCart, removeMealFromCart, addMealToCart, clearRemoveErrors })(CartList);