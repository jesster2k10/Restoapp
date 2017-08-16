import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet
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
import styles from './Styles/CartScreenStyles';
import strings from '../Config/Localization';

class CartScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.cart,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} action={CartScreen._clearCart} icon="ios-trash-outline" />,
    });

    static _clearCart() {
        console.log("Clearing cart");
    };

    _checkout = () => {
        const { navigate } = this.props.navigation;
        navigate('Checkout');
    };

    _renderCartOverlay = () => {
        const { cart } = this.props;
        const { products } = cart;

        if (products.length > 0) {
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
                </View>
            )
        } else {
            return (
                <View style={[styles.cartOverlay, { height: null, paddingBottom: 5 }]}>
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
                </View>
            )
        }
    };

    render() {
        return (
            <View style={styles.container}>
                { this._renderCartOverlay() }
                <CartList />
            </View>
        )
    };
}

const mapStateToProps = ({ cart }) => ({
   cart: cart.cart
});

export default connect(mapStateToProps, undefined)(CartScreen);