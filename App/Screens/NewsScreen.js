/**
 * Created by jesseonolememen on 25/08/2017.
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
    NewsList,
    NavigationButton
} from '../Components';
import styles from './Styles/NewsScreenStyles';
import strings from '../Config/Localization';

class NewsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.news,
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <NewsList navigation={navigation} />
            </View>
        )
    };
}

export default NewsScreen;