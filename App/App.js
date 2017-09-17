/**
 * Created by jesseonolememen on 07/08/2017.
 */
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Platform, StatusBar } from 'react-native';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { saveCart, clearCart } from './Helpers';
import { getSavedCart } from './Actions/CartActions';
import { checkForAuth } from './Actions/AuthActions';
import { getCurrentUser } from './Actions/UserActions';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Root, MainNavigator } from './Navigation/AppNavigation';
import Reducers from './Reducers';
import { Splash } from './Components';
import { Colours } from './Themes';
import Constants from './Config/Constants';
import stripe from 'tipsi-stripe';
import BTClient from 'react-native-braintree-xplat';
import BackboneEvents from 'backbone-events-standalone';

export default class Restoapp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rootComponent: <Splash />
        };

        stripe.init({
            publishableKey: Constants.STRIPE_PUBLISHABLE_KEY,
            merchantId: Constants.APPLE_PAY_MERCHANT_ID, // Optional
        });

        if (Platform.OS === 'ios') {
            BTClient.setupWithURLScheme(Constants.BRAIN_TEE_TOKEN, Constants.URL_SCHEME);
        } else {
            BTClient.setup(Constants.BRAIN_TEE_TOKEN);
        }

        let middleware;

        if (__DEV__) {
            middleware = applyMiddleware(ReduxThunk, logger);
        } else {
            middleware = applyMiddleware(ReduxThunk);
        }

        this.store = createStore(
            Reducers,
            undefined,
            compose(
                middleware
            )
        );

        this.store.subscribe(() => {
            let cart = this.store.getState().cart.cart;

            if (cart != null || cart != undefined) {
                if (Object.keys(cart).length != 0 && cart.constructor === Object) {
                    saveCart(cart._id);
                }
            }

            if (this.store.getState().auth.userLoggedIn != null) {
                if (this.store.getState().auth.userLoggedIn) {
                    this.setState({ rootComponent: <MainNavigator /> });
                } else {
                    this.setState({ rootComponent: <Root /> });
                }
            }
        });

        window.EventBus = BackboneEvents.mixin({});

       // persistStore(this.store, { storage: AsyncStorage });
    }

    componentWillMount() {
        this.store.dispatch(getSavedCart());
        this.store.dispatch(checkForAuth());
    }

    render() {
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content', true);
        } else {
            StatusBar.setBackgroundColor(Colours.statusBar.background, true);
        }

        return (
            <Provider store={this.store}>
                { this.state.rootComponent }
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Restoapp', () => Restoapp);
