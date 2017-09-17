/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    InputRow,
    Section,
    RowHeader
} from '../../Components';
import {
    changeEmail,
    changePhone,
    changeName,
    changeCity,
    changeState,
    changeAddress,
    changeCountry,
    changeZip
} from '../../Actions/FormActions';
import strings from '../../Config/Localization';
import styles from './Styles/ShippingFormStyles';

const KEY = 'SHIPPING';

class ShippingForm extends Component {
    render() {
        const {
            name,
            email,
            phone,
            address,
            city,
            zip,
            postcode,
            errors,
            country
        } = this.props;

        const {
            changeEmail,
            changePhone,
            changeName,
            changeCity,
            changeState,
            changeAddress,
            changeCountry,
            changeZip
        } = this.props;

        return (
            <View style={styles.container}>
                <Section top={5} bottom={20}>
                    <RowHeader capital center textStyle={styles.header} spacing={4}>All Fields are required</RowHeader>
                </Section>
                <Section>
                    <InputRow
                        placeholder={ strings.enterFullName }
                        first
                        autoFocus
                        error={errors.name}
                        value={name}
                        autoCapitalize="words"
                        onChangeText={(val) => changeName(true, val, KEY)}>
                        { strings.fullName }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        error={errors.email}
                        value={email}
                        keyboardType='email-address'
                        placeholder={ strings.enterEmail }
                        onChangeText={(val) => changeEmail(true, val, KEY)}>
                        { strings.email }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        phone
                        error={errors.phone}
                        value={phone}
                        placeholder={ strings.enterPhone }
                        onChangeText={(val) => changePhone(true, val, KEY)}>
                        { strings.phone }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        error={errors.address}
                        value={address}
                        autoCapitalize="words"
                        placeholder={ strings.enterAddress }
                        onChangeText={(val) => changeAddress(true, val, KEY)}>
                        { strings.address }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        error={errors.city}
                        value={city}
                        autoCapitalize="words"
                        placeholder={ strings.enterCity }
                        onChangeText={(val) => changeCity(val, KEY)}>
                        { strings.city }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        half
                        error={errors.zip}
                        value={zip}
                        placeholder={ strings.enterPostcode }
                        onChangeText={(val) => changeZip(val, KEY)}>
                        { strings.postcode }
                    </InputRow>
                    <InputRow
                        half
                        error={errors.postcode}
                        value={postcode}
                        returnKeyType="done"
                        autoCapitalize="words"
                        placeholder={ strings.enterState }
                        onChangeText={(val) => changeState(val, KEY)}>
                        { strings.state }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        error={errors.country}
                        value={country}
                        returnKeyType="done"
                        keyboardType='numbers-and-punctuation'
                        autoCapitalize="words"
                        placeholder={ strings.enterCountry }
                        onChangeText={(val) => changeCountry(true, val, KEY)}>
                        { strings.country }
                    </InputRow>
                </Section>
            </View>
        )

    };
}

const mapStateToProps = ({ shippingForm }) => {
    const {
        name,
        email,
        phone,
        address,
        city,
        zip,
        state,
        errors
    } = shippingForm;

    return {
        name,
        email,
        phone,
        address,
        city,
        zip,
        state,
        errors
    }
};

const actions = {
    changeEmail,
    changePhone,
    changeName,
    changeCity,
    changeState,
    changeAddress,
    changeCountry,
    changeZip
};

export default connect(mapStateToProps, actions)(ShippingForm);