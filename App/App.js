/**
 * Created by jesseonolememen on 07/08/2017.
 */
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    AppRegistry
} from 'react-native';
import Root from './Navigation/AppNavigation';
import Reducers from './Reducers';

export default class Restoapp extends Component {
    constructor() {
        super();
        this.store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
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
