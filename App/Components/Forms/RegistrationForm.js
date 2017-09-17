/**
 * Created by jesseonolememen on 21/08/2017.
 */

import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    changePassword,
    changeEmail,
    changeName
} from '../../Actions/FormActions';
import {
    InputRow,
    Section
} from '../../Components';
import styles from './Styles/RegistrationFormStyles';
import strings from '../../Config/Localization';

const RegistrationForm = ({ email, password, errors, name, changeEmail, changePassword, changeName }) => {
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
                    onChangeText={(val) => changePassword(true, val)}
                    label={strings.password}/>
            </Section>
            <Section>
                <InputRow
                    placeholder={strings.fullName}
                    value={name}
                    error={errors.name}
                    onChangeText={(val) => changeName(true, val)}
                    label={strings.enterFullName}/>
            </Section>
        </View>
    );
};

const mapStateToProps = ({ registrationForm }) => {
    return {
        email: registrationForm.email,
        password: registrationForm.password,
        errors: registrationForm.errors,
        name: registrationForm.name
    }
};

const actions = {
    changePassword,
    changeEmail,
    changeName
};

export default connect(mapStateToProps, actions)(RegistrationForm);