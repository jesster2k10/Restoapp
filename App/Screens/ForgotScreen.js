/**
 * Created by jesseonolememen on 23/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Container,
    Text,
    Header,
    Left,
    Body,
    Right,
    Title,
    Root,
} from 'native-base';
import {
    NavigationButton,
    SubmitButton,
} from '../Components';
import strings from '../Config/Localization';
import AppNavigationStyles from '../Navigation/Styles/AppNavigationStyles';
import styles from './Styles/ForgotScreen';

const ForgotScreen = ({ navigation }) => {
    const { password } = navigation.state.params;

    return (
        <Root>
            <View style={styles.container}>
                <Header iosBarStyle="light-content" style={AppNavigationStyles.headerStyle}>
                    <Left>
                        <NavigationButton navigation={navigation} back icon="ios-close-outline"  />
                    </Left>
                    <Body>
                    <Title style={AppNavigationStyles.headerTitleStyle}>
                        { password ? strings.forgotPassword : strings.forgotEmail }
                    </Title>
                    </Body>
                    <Right />
                </Header>
                <SubmitButton title={strings.submit} />
            </View>
        </Root>
    );
};

export default ForgotScreen;