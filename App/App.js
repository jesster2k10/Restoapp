/**
 * Created by jesseonolememen on 07/08/2017.
 */
import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import {
    Provider,
} from 'react-redux';
import codePush from 'react-native-code-push';
import configureStore from './Store/Store';
import Root from './Root';

const store = configureStore();

let Restoapp = () => (
    <Provider store={store}>
        <Root />
    </Provider>
);

export default Restoapp;

AppRegistry.registerComponent('Restoapp', () => Restoapp);
