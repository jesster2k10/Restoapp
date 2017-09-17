/**
 * Created by jesseonolememen on 26/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    NavigationButton,
    MenuList
} from '../Components';
import styles from './Styles/CategoryScreenStyles';

class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.category.name,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    render() {
        const { navigation } = this.props;
        const { category } = navigation.state.params;

        return (
            <View style={styles.container}>
                <MenuList navigation={navigation} category={category} />
            </View>
        )
    };
}

export default CategoryScreen;