/**
 * Created by jesseonolememen on 30/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import {
    NavigationButton
} from '../Components';
import styles from './Styles/PhotoScreenStyles';

class PhotoScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Restoapp',
        headerLeft: <NavigationButton navigation={navigation} size={25} back icon="ios-close-outline" />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    render() {
        const { photo } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.image} source={{ uri: photo.image.secure_url }} />
            </View>
        )
    };
}

export default PhotoScreen;