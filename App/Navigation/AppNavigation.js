/**
 * Created by jesseonolememen on 07/08/2017.
 */
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { View } from 'react-native'

import LandingScreen from '../Screens/LandingScreen';
import MenuScreen from '../Screens/MenuScreen';
import MealScreen from '../Screens/MealScreen';
import CartScreen from '../Screens/CartScreen';
import CheckoutScreen from '../Screens/CheckoutScreen';

import AppNavigationStyles from './Styles/AppNavigationStyles';

const CheckoutNavigator = StackNavigator({
    Checkout: { screen: CheckoutScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'Checkout',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const MenuNavigator = StackNavigator({
    Menu: { screen: MenuScreen },
    Meal: { screen: MealScreen },
    Cart: { screen: CartScreen },
    Checkout: { screen: CheckoutNavigator }
}, {
    headerMode: 'screen',
    initialRouteName: 'Checkout',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const MainNavigator = DrawerNavigator({
    Menu: { screen: MenuNavigator }
});

const Root = StackNavigator({
    LandingScreen: { screen: LandingScreen },
    MainScreen: { screen: MainNavigator }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'MainScreen',
    navigationOptions: {
        ...AppNavigationStyles
    }
});

export default Root;
