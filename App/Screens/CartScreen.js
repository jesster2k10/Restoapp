import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Alert,
    TextInput,
} from 'react-native';
import {
    Text,
    Button
} from 'native-base';
import {
    NavigationButton,
    CartList,
} from '../Components';
import {
    Grid,
    Col,
    Row,
} from 'react-native-easy-grid';
import {
    getSubtotal
} from '../Helpers';
import {
    resetCart,
    clearResetErrors,
    changeOrderNote,
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

    _showBadCartError = () => {
        Alert.alert(
            strings.failedToCheckout,
            strings.formatString(strings.minOrderAlertText, this.props.currency),
            [
                {
                    text: strings.cancel
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
        const { cart, validCart, orderNote, changeOrderNote } = this.props;

        if (cart)
            if (cart.products && cart.products.length > 0) {
                return (
                    <View style={styles.cartOverlay}>
                        <View style={styles.priceContainer}>
                            <Grid>
                                <Row size={3}>
                                    <Col size={7}>
                                        <Text style={styles.subtotalTitle}>{ strings.subtotal }</Text>
                                    </Col>
                                    <Col size={4} style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.subtotalTitle}>{ getSubtotal(cart) }</Text>
                                    </Col>
                                </Row>
                                <Row size={7}>
                                    <View style={styles.orderNoteContainer}>
                                        <Text style={styles.subtotalTitle}>{ strings.orderNote }</Text>
                                        <TextInput
                                            style={styles.orderNoteTextField}
                                            placeholder={strings.addOrderNote}
                                            placeholderTextColor='white'
                                            underlineColorAndroid='rgba(0,0,0,0.25)'
                                            maxLength={500}
                                            value={orderNote}
                                            onChangeText={text => changeOrderNote(text)}
                                        />
                                    </View>
                                </Row>
                            </Grid>
                        </View>
                        <Button block style={validCart ? styles.button : styles.inactiveButton} onPress={validCart ? this._checkout : this._showBadCartError}>
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

        console.log(this.props);

        return (
            <View style={styles.container}>
                { this._renderCartOverlay() }
                <CartList navigation={navigation} />
            </View>
        )
    };
}

const mapStateToProps = ({ cart, auth, checkout, }) => ({
    cart: cart.cart,
    currency: cart.currency,
    validCart: cart.validCart,
    token: auth.token,
    resetError: cart.cart_reset_error,
    resetLoading: cart.cart_reset_loading,
    resetSuccess: cart.cart_reset_success,
    orderNote: checkout.order_note,
});

export default connect(mapStateToProps, { resetCart, clearResetErrors, changeOrderNote })(CartScreen);