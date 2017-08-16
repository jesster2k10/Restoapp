import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import {
    NavigationButton
} from '../Components';
import MenuList from  '../Components/MenuList';
import styles from './Styles/MenuScreenStyles';

class MenuScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Menu',
        headerLeft: <NavigationButton navigation={navigation} />,
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