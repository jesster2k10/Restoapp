/**
 * Created by jesseonolememen on 23/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
} from 'react-native';
import {
    changePassword,
    changeEmail
} from '../../Actions/FormActions';
import {
    InputRow,
    Section
} from '../../Components';
import strings from '../../Config/Localization';
import styles from './Styles/LoginFormStyles';

const LoginForm = ({ email, password, errors, changeEmail, changePassword }) => {
    return (
        <View style={styles.container}>
            <Section>
                <InputRow
                    placeholder={strings.enterEmail}
                    value={email}
                    error={errors.email}
                    onChangeText={(val) => changeEmail(true, val)}
                    label={strings.email} />
            </Section>
            <Section>
                <InputRow
                    password
                    placeholder={strings.enterPassword}
                    value={password}
                    error={errors.password}
                    onChangeText={(val) => changePassword(false, val)}
                    label={strings.password}/>
            </Section>
        </View>
    );
};

const mapStateToProps = ({ loginForm }) => {
    return {
        email: loginForm.email,
        password: loginForm.password,
        errors: loginForm.errors
    }
};

const actions = {
    changePassword,
    changeEmail,
};

export default connect(mapStateToProps, actions)(LoginForm);