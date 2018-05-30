import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    StatusBar,
} from 'react-native';
import stripe from 'tipsi-stripe';
import Braintree from 'react-native-braintree-xplat';
import BackboneEvents from 'backbone-events-standalone';
import {
    Splash,
} from './Components';
import {
    Colours,
} from './Themes';
import {
    getSavedCart,
    getSavedCustomerId,
    getBraintreeClientToken,
    checkForAuth,
} from './Actions';
import {
    getCart,
    clearCart,
    saveCart,
} from './Helpers';
import {
    Root as RootNavigator,
    MainNavigator,
} from './Navigation/AppNavigation';
import Constants from './Config/Constants';

/// The Root Component inside of our app
/// Responsible for setting up the app

class Root extends Component {
    state = {
        rootComponent: <Splash />
    };

    componentDidMount = () => {
        const {
            getSavedCart,
            getSavedCustomerId,
            getBraintreeClientToken,
            checkForAuth,
        } = this.props;

        getSavedCart();
        getSavedCustomerId();
        getBraintreeClientToken();
        checkForAuth();

        this._updateForDev();
        this._initSdks();
    };

    componentWillReceiveProps = (props) => {
        console.log(props);

        const {
            cart,
            braintreeToken,
            userLoggedIn,
            userId,
            userLoginError,
        } = props;

        if (braintreeToken) {
            Platform.OS === 'ios' ? Braintree.setupWithURLScheme(braintreeToken, Constants.URL_SCHEME) : Braintree.setup(braintreeToken);
        }

        if (cart) {
            if (Object.keys(cart).length != 0 && cart.constructor === Object) {
                saveCart(cart._id);
            }
        }

        if (userLoggedIn && userId && !userLoginError) {
            this._updateRootComponent(<MainNavigator />);
        } else {
            this._updateRootComponent(<RootNavigator />);
        }
    };

    _initSdks = () => {
        stripe.init({
            publishableKey: Constants.STRIPE_PUBLISHABLE_KEY,
            merchantId: Constants.APPLE_PAY_MERCHANT_ID,
        });

        window.EventBus = BackboneEvents.mixin({});      
    };

    _updateRootComponent = (rootComponent) => {
        this.setState({ rootComponent });
    };

    _updateForDev = () => {
        console.disableYellowBox = !__DEV__;
    };

    render() {
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content', true);
        } else {
            StatusBar.setBackgroundColor(Colours.statusBar.background, true);
        }

        return this.state.rootComponent;
    }
}

const mapStateToProps = ({ cart, payments, auth }) => ({
    cart: cart.cart,
    braintreeToken: payments.bt_token,
    userLoggedIn: auth.userLoggedIn,
    userId: auth.userId,
    userLoginError: auth.error,
});

const mapDispatchToProps = (dispatch) => ({
    getSavedCart: () => dispatch(getSavedCart()),
    getBraintreeClientToken: () => dispatch(getBraintreeClientToken()),
    getSavedCustomerId: () => dispatch(getSavedCustomerId()),
    checkForAuth: () => dispatch(checkForAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);