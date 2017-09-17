/**
 * Created by jesseonolememen on 21/08/2017.
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
    CategoriesList
} from '../Components';
import strings from '../Config/Localization';
import styles from './Styles/CategoriesScreenStyles';

class CategoriesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.categories,
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    render() {
        return (
            <View style={styles.container}>
                <CategoriesList navigation={this.props.navigation} />
            </View>
        )
    };
}

export default CategoriesScreen;