
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Animatable
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    InputRow,
    Section,
    RowHeader,
    Row
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
import styles, { countryPickerStyles } from './Styles/SharedFormStyles';
import CountryPicker from 'react-native-country-picker-modal';
import Spinner from 'react-native-spinkit';
import countries from '../../Config/countries.json';

class AddressForm extends Component {
    componentDidMount() {
        this.hasChanged = false;
    }

    state = {
        cca2: countries.countries.first
    };

    componentWillReceiveProps({ selectedAddress, user }) {
        const {
            changeCity,
            changeState,
            changeAddress,
            changeCountry,
            changeZip
        } = this.props;
        
        if (selectedAddress && selectedAddress.address && selectedAddress.name && !this.hasChanged) {
            const {
                name
            } = selectedAddress;

            const {
                street1,
                suburb,
                state,
                postcode,
                country,
            } = selectedAddress.address;

            if (street1) {
                changeAddress(false, street1, KEY);
            }

            if (suburb) {
                changeCity(suburb, KEY);
            }

            if (country) {
                changeCountry(country, KEY);
            }

            if (state) {
                changeState(state, KEY);
            }

            if (postcode) {
                changeZip(postcode, KEY);
            }

            if (name) {
                changeName(false, `${name.first} ${name.last || ''}`)
            }

            this.hasChanged = true;
        }
    }

    componentDidMount() {
        const {
            changeEmail,
            changePhone,
            changeName,
        } = this.props;

        const {
            user,
            userLoggedIn,
        } = this.props;

        if (user && userLoggedIn && user.name) {
            let name = `${user.name.first} ${user.name.last && user.name.last != 'BLANK_NAME' ? user.name.last : ''}`

            if (name != '') {
                changeName(false, name, KEY);
            }
        }

        if (user && user.email) {
            changeEmail(false, user.email, KEY);
        }

        if (user && user.phone) {
            changePhone(false, user.phone, KEY)
        }
    }

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
            country,
            user,
            token,
            userId,
            userLoggedIn,
        } = this.props;

        const {
            changeEmail,
            changePhone,
            changeName,
            changeCity,
            changeState,
            changeAddress,
            changeCountry,
            changeZip,
            loading
        } = this.props;

        if (loading) {
            return (
                <View style={styles.centeredContainer}>
                    <Spinner
                        isVisible
                        size={17}
                        type='Arc'
                        color='white'/>
                    <Text style={styles.loader}>{ strings.validatingAddress }</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Section>
                    <InputRow
                        placeholder={ strings.enterFullName }
                        first
                        autoFocus
                        error={errors.name}
                        value={name}
                        autoCapitalize="words"
                        onChangeText={(val) => changeName(true, val, this.props.KEY)}>
                        { strings.fullName }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        error={errors.email}
                        value={email}
                        keyboardType='email-address'
                        placeholder={ strings.enterEmail }
                        onChangeText={(val) => changeEmail(true, val, this.props.KEY)}>
                        { strings.email }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        phone
                        error={errors.phone}
                        value={phone}
                        placeholder={ strings.enterPhone }
                        onChangeText={(val) => changePhone(true, val, this.props.KEY)}>
                        { strings.phone }
                    </InputRow>
                </Section>
                <View>
                            <Section>
                                <InputRow
                                    error={errors.address}
                                    value={address}
                                    autoCapitalize="words"
                                    placeholder={ strings.enterAddress }
                                    onChangeText={(val) => changeAddress(true, val, this.props.KEY)}>
                                    { strings.address }
                                </InputRow>
                            </Section>
                            <Section>
                                <InputRow
                                    error={errors.city}
                                    value={city}
                                    autoCapitalize="words"
                                    placeholder={ strings.enterCity }
                                    onChangeText={(val) => changeCity(val, this.props.KEY)}>
                                    { strings.city }
                                </InputRow>
                            </Section>
                            <Section>
                                <InputRow
                                    half
                                    error={errors.zip}
                                    value={zip}
                                    placeholder={ strings.enterPostcode }
                                    onChangeText={(val) => changeZip(val, this.props.KEY)}>
                                    { strings.postcode }
                                </InputRow>
                                <InputRow
                                    half
                                    error={errors.state}
                                    value={postcode}
                                    returnKeyType="done"
                                    autoCapitalize="words"
                                    placeholder={ strings.enterState }
                                    onChangeText={(val) => changeState(val, this.props.KEY)}>
                                    { strings.state }
                                </InputRow>
                            </Section>
                        </View>
            </View>
        )
    };
}

const mapStateToProps = (appState) => {
   const { shippingForm, user, checkout, auth } = appState;

    const {
        name,
        email,
        phone,
        address,
        city,
        zip,
        state,
        errors,
    } = shippingForm;

    console.log(appState);

    return {
        name,
        email,
        phone,
        address,
        city,
        zip,
        state,
        errors,
        user: user.currentUser,
        userLoggedIn: auth.userLoggedIn,
        token: auth.token,
        userId: auth.userId,
        selectedAddress: checkout.selected_address,
        method: checkout.delivery_method,
        loading: geo_code_loading
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

export default connect(mapStateToProps, actions)(AddressForm);