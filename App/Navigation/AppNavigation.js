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
import SelectCardScreen from '../Screens/SelectCardScreen';
import OrdersScreen from '../Screens/OrdersScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import ForgotScreen from '../Screens/ForgotScreen';
import NewsScreen from '../Screens/NewsScreen';
import NewsItemScreen from '../Screens/NewsItemScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import PhotosScreen from '../Screens/PhotosScreen';
import PhotoScreen from '../Screens/PhotoScreen';
import InfoScreen from '../Screens/InfoScreen';

import {
    Drawer
} from '../Components';

import AppNavigationStyles from './Styles/AppNavigationStyles';

const CheckoutNavigator = StackNavigator({
    Checkout: { screen: CheckoutScreen },
    SelectCard: { screen: SelectCardScreen }
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
    Checkout: { screen: CheckoutNavigator },
}, {
    headerMode: 'screen',
    initialRouteName: 'Menu',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const OrderNavigator = new StackNavigator({
    Orders: { screen: OrdersScreen }
}, {
    headerMode: 'screen',
    initialRouteName: 'Orders',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const CategoriesNavigator = new StackNavigator({
    Categories: { screen: CategoriesScreen },
    Category: { screen: CategoryScreen }
}, {
    headerMode: 'screen',
    initialRouteName: 'Categories',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const NewsNavigator = new StackNavigator({
    News: { screen: NewsScreen },
    SelectedNews: { screen: NewsItemScreen }
}, {
    headerMode: 'screen',
    initialRouteName: 'News',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const PhotosNavigator = new StackNavigator({
    Photos: { screen: PhotosScreen },
    Photo: { screen: PhotoScreen }
}, {
    headerMode: 'screen',
    mode: 'modal',
    initialRouteName: 'Photos',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const InfoNavigator = new StackNavigator({
    Info: { screen: InfoScreen }
}, {
    headerMode: 'screen',
    initialRouteName: 'Info',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

export const MainNavigator = DrawerNavigator({
    Menu: { screen: MenuNavigator },
    Categories: { screen: CategoriesNavigator },
    News: { screen: NewsNavigator },
    Orders: { screen: OrderNavigator },
    Photos: { screen: PhotosNavigator },
    Info: { screen: InfoNavigator }
}, {
    initialRouteName: 'Menu',
    headerMode: 'screen',
    contentComponent: (props) => <Drawer props={props} navigate={props.navigation.navigate} />
});

export const Root = StackNavigator({
    LandingScreen: { screen: LandingScreen },
    Registration: { screen: RegistrationScreen },
    Forgot: { screen: ForgotScreen },
    MainScreen: { screen: MainNavigator }
}, {
    // Default config for all screens
    headerMode: 'none',
    header: {
        visible: false
    },
    mode: 'modal',
    initialRouteName: 'LandingScreen',
    navigationOptions: {
        ...AppNavigationStyles
    }
});

