/**
 * Created by jesseonolememen on 22/08/2017.
 */
import React from 'react';
import {
    View,
    Image
} from 'react-native';
import {
    Images
} from '../Themes';
import styles from './Styles/SplashStyles';

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={Images.logo} />
        </View>
    );
};

export default Splash;