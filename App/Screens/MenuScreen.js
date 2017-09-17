import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import {
    NavigationButton,
    MealReviewItem
} from '../Components';
import MenuList from  '../Components/MenuList';
import styles from './Styles/MenuScreenStyles';

class MenuScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Menu',
        drawerLabel: 'Menu',
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: <NavigationButton navigation={navigation} cart />
    });

    render() {
        return (
            <View style={styles.container}>
                <MenuList navigation={this.props.navigation} />
            </View>
        );
    }
};

export default MenuScreen;