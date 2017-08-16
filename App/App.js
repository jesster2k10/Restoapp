/**
 * Created by jesseonolememen on 07/08/2017.
 */
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { saveCart } from './Helpers';
import { getSavedCart } from './Actions/CartActions';
import { Provider } from 'react-redux';
import { AppRegistry, AsyncStorage } from 'react-native';
import Root from './Navigation/AppNavigation';
import Reducers from './Reducers';

export default class Restoapp extends Component {
    constructor() {
        super();

        this.store = createStore(
            Reducers,
            undefined,
            compose(
                applyMiddleware(ReduxThunk, logger),
                autoRehydrate()
            )
        );

        this.store.subscribe(() => {
            let cart = this.store.getState().cart.cart;

            if (cart != null || cart != undefined) {
                if (Object.keys(cart).length != 0 && cart.constructor === Object) {
                    saveCart(cart._id);
                }
            }
        });

        persistStore(this.store, { storage: AsyncStorage });
    }

    componentWillMount() {
        this.store.dispatch(getSavedCart());
    }

    render() {
        return (
            <Provider store={this.store}>
                <Root />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Restoapp', () => Restoapp);
