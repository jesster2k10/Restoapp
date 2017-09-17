import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Alert
} from 'react-native';
import {
    Text,
    Button
} from 'native-base';
import {
    NavigationButton,
    CartList,
    Section
} from '../Components';
import {
    Grid,
    Col,
} from 'react-native-easy-grid';
import {
    getSubtotal
} from '../Helpers';
import {
    resetCart,
    clearResetErrors
} from '../Actions/CartActions';
import {
    ApplicationStyles
} from '../Themes';
import Toast from 'react-native-easy-toast';
import styles from './Styles/CartScreenStyles';
import strings from '../Config/Localization';
import Constants from '../Config/Constants';

class CartScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.cart,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} action={CartScreen._clearCart} icon="ios-trash-outline" size={25} />,
    });

    componentWillMount() {
        const { resetCart, cart, token } = this.props;

        window.EventBus.on(Constants.EVENTS.DID_CLEAR_CART, () => resetCart(token, cart._id));
    }

    componentWillReceiveProps({ resetError, resetLoading, resetSuccess, clearResetErrors }) {
        if (resetError && !resetLoading && !resetSuccess) {
            this.refs.toast.show(strings.failedToResetCart);
            clearResetErrors();
        }
    }

    static _clearCart() {
        Alert.alert(
            strings.clearCart,
            strings.confirmClearCart,
            [
                {
                    text: strings.cancel
                },
                {
                    text: strings.ok,
                    onPress: () => window.EventBus.trigger(Constants.EVENTS.DID_CLEAR_CART),
                    style: 'cancel'
                },
            ],
            {
                cancelable: false
            }
        )
    };

    _checkout = () => {
        const { navigate } = this.props.navigation;
        navigate('Checkout');
    };

    _renderCartOverlay = () => {
        const { cart } = this.props;

        if (cart)
            if (cart.products && cart.products.length > 0) {
                return (
                    <View style={styles.cartOverlay}>
                        <View style={styles.priceContainer}>
                            <Grid>
                                <Col size={7}>
                                    <Text style={styles.subtotalTitle}>{ strings.subtotal }</Text>
                                </Col>
                                <Col size={4} style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.subtotalTitle}>{ getSubtotal(cart) }</Text>
                                </Col>
                            </Grid>
                        </View>
                        <Button block style={styles.button} onPress={this._checkout}>
                            <Text style={styles.buttonTitle}>{ strings.checkout }</Text>
                        </Button>
                        <Toast
                            ref="toast"
                            style={ApplicationStyles.toast.body}
                            textStyle={ApplicationStyles.toast.text}/>
                    </View>
                )
            }
    };

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                { this._renderCartOverlay() }
                <CartList navigation={navigation} />
            </View>
        )
    };
}

const mapStateToProps = ({ cart, auth }) => ({
    cart: cart.cart,
    token: auth.token,
    resetError: cart.cart_reset_error,
    resetLoading: cart.cart_reset_loading,
    resetSuccess: cart.cart_reset_success
});

export default connect(mapStateToProps, { resetCart, clearResetErrors })(CartScreen);