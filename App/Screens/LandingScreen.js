import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../Themes/Images';
import Colours from '../Themes/Colours';
import styles from './Styles/LandingScreenStyles';

const LandingScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={Images.background}>
                <LinearGradient
                    colors={Colours.blueGradient}
                    style={styles.gradient}
                    locations={[0.5,0.6]}
                />
            </Image>
            <View style={styles.baseContainer}>
                <Text>Hi</Text>
            </View>
        </View>
    );
};

export default LandingScreen;