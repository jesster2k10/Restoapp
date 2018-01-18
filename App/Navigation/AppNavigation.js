/**
 * Created by jesseonolememen on 07/08/2017.
 */
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { View } from 'react-native'

import LandingScreen from '../Screens/LandingScreen';
import MenuScreen from '../Screens/MenuScreen';
import MealScreen from '../Screens/MealScreen';
import MealExtrasScreen from '../Screens/MealExtrasScreen';
import CartScreen from '../Screens/CartScreen';
import CheckoutScreen from '../Screens/CheckoutScreen';
import SelectCardScreen from '../Screens/SelectCardScreen';
import SelectAddressScreen from '../Screens/SelectAddressScreen';
import OrdersScreen from '../Screens/OrdersScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import ForgotScreen from '../Screens/ForgotScreen';
import NewsScreen from '../Screens/NewsScreen';
import NewsItemScreen from '../Screens/NewsItemScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import PhotosScreen from '../Screens/PhotosScreen';
import GalleryScreen from '../Screens/GalleryScreen';
import PhotoScreen from '../Screens/PhotoScreen';
import InfoScreen from '../Screens/InfoScreen';
import ReservationsScreen from '../Screens/ReservationScreen';
import ReceiptScreen from '../Screens/ReceiptScreen';
import FavouritesScreen from '../Screens/FavouritesScreen';
import SelectDeliveryScreen from '../Screens/SelectDeliveryScreen';

import {
    Drawer
} from '../Components';

import AppNavigationStyles from './Styles/AppNavigationStyles';

const CheckoutNavigator = StackNavigator({
    Checkout: { screen: CheckoutScreen },
    SelectAddress: { screen: SelectAddressScreen },
    SelectCard: { screen: SelectCardScreen },
    SelectDelivery: { screen: SelectDeliveryScreen },
    Receipt: { screen: ReceiptScreen },
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
    Category: { screen: CategoryScreen },
    MealExtras: { screen: MealExtrasScreen },
    Checkout: { screen: CheckoutNavigator },
    Reservations: { screen: ReservationsScreen },
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
    Photo: { screen: PhotoScreen },
    Gallery: { screen: GalleryScreen },
}, {
    headerMode: 'screen',
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

const ReservationsNavigator = new StackNavigator({
    Reservations: { screen: ReservationsScreen }
}, {
    headerMode: 'screen',
    initialRouteName: 'Reservations',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

const FavouritesNavigator = new StackNavigator({
    Favourites: { screen: FavouritesScreen }
}, {
    headerMode: 'screen',
    initialRouteName: 'Favourites',
    navigationOptions: {
        ...AppNavigationStyles,
    }
});

export const MainNavigator = DrawerNavigator({
    Menu: { screen: MenuNavigator },
    News: { screen: NewsNavigator },
    Orders: { screen: OrderNavigator },
    Favourites: { screen: FavouritesNavigator },
    Photos: { screen: PhotosNavigator },
    Info: { screen: InfoNavigator },
}, {
    initialRouteName: 'Menu',
    headerMode: 'screen',
    contentComponent: (props) => <Drawer props={props} navigate={props.navigation.navigate} />
});

export const Root = StackNavigator({
    LandingScreen: { screen: LandingScreen },
    Registration: { screen: RegistrationScreen },
    Forgot: { screen: ForgotScreen },
    MainScreen: { screen: MainNavigator },
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

