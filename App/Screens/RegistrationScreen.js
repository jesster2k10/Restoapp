/**
 * Created by jesseonolememen on 21/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    Alert
} from 'react-native';
import {
    Container,
    Text,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Root,
    ActionSheet,
} from 'native-base';
import {
    RegistrationForm,
    NavigationButton,
    SubmitButton,
    LoginForm,
    TextButton,
} from '../Components';
import {
    login,
    register
} from '../Actions/AuthActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast'
import strings from '../Config/Localization';
import styles from './Styles/RegistrationScreenStyles';
import AppNavigationStyles from '../Navigation/Styles/AppNavigationStyles';

class RegistrationScreen extends Component {
    componentWillMount() {
        this.hasLoggedIn = false;
        this.hasRegistered = false;
    }

    componentWillReceiveProps(props) {
        const { loginError, loginSuccess, loading } = props;
        const { registerError, registerSuccess, registerLoading } = props;
        const { navigation } = props;
        const { navigate } = navigation;
        const { register } = navigation.state.params;

        if (!loginSuccess && loginError != null) {
            this.hasLoggedIn = false;
            this.refs.toast.show(loginError, DURATION.LENGTH_LONG);
        } else if (!this.hasLoggedIn && loginSuccess && loginError == null && !loading) {
            this.hasLoggedIn = true;
            navigate('MainScreen');
        }

        if (!registerSuccess && registerError && !registerLoading) {
            this.hasRegistered = false;
            this.refs.toast.show(registerError, DURATION.LENGTH_LONG);
        } else if (!this.hasRegistered && registerSuccess && !registerLoading && !registerError) {
            this.hasRegistered = true;
            navigate('MainScreen');
        }
    }

    _needHelp = () => {
        const { navigate } = this.props.navigation;

        let buttons = [strings.forgotPassword, strings.cancel];
        let cancelIndex = buttons.length - 1;

        ActionSheet.show({
                options: buttons,
                cancelButtonIndex: cancelIndex,
                title: strings.needHelpTitle
            }, buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        navigate('Forgot', { password: true, email: false });
                        return;
                    case 1:
                        navigate('Forgot', { password: false, email: true });
                        return;
                    case 2:
                        return;
                }
            }
        );
    };

    _submit = () => {
        const {
            navigation,
            register,
            login,
            loginEmail,
            registrationEmail,
            registrationName,
            registrationPassword,
            loginPassword
        } = this.props;

        if (!navigation.state.params.register) {
            login(loginEmail, loginPassword)
        } else {
            register(registrationEmail, registrationPassword, registrationName);
        }
    };

    render() {
        const { navigation, loading, registerLoading } = this.props;
        const { register } = navigation.state.params;
        const { navigate } = navigation;

        let form = register ? <RegistrationForm /> : <LoginForm />;
        let bottom = register ?
            <Text style={styles.terms}>{ strings.agreeToTerms }</Text> : <TextButton onPress={() => this._needHelp(navigation)}>{ strings.needHelp }</TextButton>;

        return (
            <Root>
                <View style={styles.container}>
                    <Header iosBarStyle="light-content" style={AppNavigationStyles.headerStyle}>
                        <Left>
                            <NavigationButton navigation={navigation} back icon="ios-close-outline"  />
                        </Left>
                        <Body>
                        <Title style={AppNavigationStyles.headerTitleStyle}>
                            { register ? strings.register : strings.login }
                        </Title>
                        </Body>
                        <Right />
                    </Header>
                    <KeyboardAwareScrollView>
                        { form }
                        <View style={styles.textContainer}>
                            { bottom }
                            <TextButton onPress={() => navigate('Registration', { register: !register })}>{ register ? strings.alreadyRegistered : strings.notRegistered }</TextButton>
                        </View>
                    </KeyboardAwareScrollView>
                    <SubmitButton loading={loading && !register ? true : !!(registerLoading && register)} onPress={() => this._submit()} title={ register ? strings.register : strings.login } />
                </View>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    textStyle={styles.toastText}/>
            </Root>
        )
    }
};

const mapStateToProps = ({ registrationForm, loginForm, auth }) => ({
    registrationEmail: registrationForm.email,
    registrationName: registrationForm.name,
    registrationPassword: registrationForm.password,
    loginEmail: loginForm.email,
    loginPassword: loginForm.password,
    loginError: auth.login_error,
    loginSuccess: auth.login_success,
    registerLoading: auth.register_loading,
    registerError: auth.register_error,
    registerSuccess: auth.register_success,
    loading: auth.login_loading
});

const actions = {
    login,
    register
};

export default connect(mapStateToProps, actions)(RegistrationScreen);