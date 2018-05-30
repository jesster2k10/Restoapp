/**
 * Created by jesseonolememen on 15/08/2017.
 */

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

String.prototype.capitalize = function(){
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

class ShippingForm extends Component {
    componentDidMount() {
        this.hasChanged = false;
    }

    state = {
        cca2: countries.countries.first
    };

    componentWillReceiveProps({ selectedAddress, user, type }) {
        const {
            changeCity,
            changeState,
            changeAddress,
            changeCountry,
            changeZip,
            changePhone,
            changeEmail,
        } = this.props;
        
        if (selectedAddress && selectedAddress.address && selectedAddress.name && !this.hasChanged) {
            const {
                name,
                phone,
                email,
            } = selectedAddress;

            const {
                street1,
                suburb,
                state,
                postcode,
                country,
            } = selectedAddress.address;

            if (phone) {
                changePhone(false, phone, type);
            }

            if (email) {
                changeEmail(false, email, type);
            }

            if (street1) {
                changeAddress(false, street1, type);
            }

            if (suburb) {
                changeCity(suburb, type);
            }

            if (country) {
                changeCountry(country, type);
            }

            if (state) {
                changeState(state, type);
            }

            if (postcode) {
                changeZip(postcode, type);
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
            type,
        } = this.props;

        if (user && userLoggedIn && user.name) {
            let name = `${user.name.first} ${user.name.last && user.name.last != 'BLANK_NAME' ? user.name.last : ''}`

            if (name != '') {
                changeName(false, name, type);
            }
        }

        if (user && user.email) {
            changeEmail(false, user.email, type);
        }

        if (user && user.phone) {
            changePhone(false, user.phone, type)
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
            state,
            errors,
            country,
            user,
            token,
            userId,
            userLoggedIn,
            type,
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
            method,
            loading
        } = this.props;

        console.log(this.props);

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
                { type == 'SHIPPING' ? 
                <Section top={5} bottom={20}>
                    <RowHeader capital center textStyle={styles.header} spacing={4}>All Fields are required</RowHeader>
                </Section> : null }
                { user && userId && token && userLoggedIn && type == 'SHIPPING' && method == 'DELIVERY'  ? (
                        <Section bottom={25}>
                            <View style={styles.rowContainer}>
                                <Row
                                    title={strings.useSavedAddress}
                                    body={strings.selectAddress}
                                    style={styles.row}
                                    disclosure
                                    first
                                    action={() => this.props.navigation.navigate('SelectAddress', { backRoute: 'Checkout', checkout: true })}
                                />
                            </View>
                        </Section>
                    ) : null }
                { type == 'SHIPPING' ? 
                <Section bottom={25}>
                    <View style={styles.rowContainer}>
                        <Row
                            title={strings.chooseDeliveryType}
                            body={method ? method.toLowerCase().capitalize() : strings.deliveryOrCollection}
                            style={styles.row}
                            bodyStyle={styles.body}
                            disclosure
                            action={() => this.props.navigation.navigate('SelectDelivery')}
                        />
                    </View>
                </Section> : null }
                <Section>
                    <InputRow
                        placeholder={ strings.enterFullName }
                        first
                        autoFocus
                        error={errors.name}
                        value={name}
                        autoCapitalize="words"
                        onChangeText={(val) => changeName(true, val, this.props.type)}>
                        { strings.fullName }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        error={errors.email}
                        value={email}
                        keyboardType='email-address'
                        placeholder={ strings.enterEmail }
                        onChangeText={(val) => changeEmail(true, val, this.props.type)}>
                        { strings.email }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        phone
                        error={errors.phone}
                        value={phone}
                        placeholder={ strings.enterPhone }
                        onChangeText={(val) => changePhone(true, val, this.props.type)}>
                        { strings.phone }
                    </InputRow>
                </Section>
                { method === 'DELIVERY' ? (
                        <View>
                            <Section>
                                <InputRow
                                    error={errors.address}
                                    value={address}
                                    autoCapitalize="words"
                                    placeholder={ strings.enterAddress }
                                    onChangeText={(val) => changeAddress(true, val, this.props.type)}>
                                    { strings.address }
                                </InputRow>
                            </Section>
                            <Section>
                                <InputRow
                                    error={errors.city}
                                    value={city}
                                    autoCapitalize="words"
                                    placeholder={ strings.enterCity }
                                    onChangeText={(val) => changeCity(val, this.props.type)}>
                                    { strings.city }
                                </InputRow>
                            </Section>
                            <Section>
                                <InputRow
                                    half
                                    error={errors.zip}
                                    value={zip}
                                    placeholder={ strings.enterPostcode }
                                    onChangeText={(val) => changeZip(val, this.props.type)}>
                                    { strings.postcode }
                                </InputRow>
                                <InputRow
                                    half
                                    error={errors.state}
                                    value={state}
                                    returnKeyType="done"
                                    autoCapitalize="words"
                                    placeholder={ strings.enterState }
                                    onChangeText={(val) => changeState(val, this.props.type)}>
                                    { strings.state }
                                </InputRow>
                            </Section>
                        </View>
                    ) : null
                }

            </View>
        )

    };
}

ShippingForm.defaultProps = {
    type: 'SHIPPING'
}

const mapStateToProps = ({ shippingForm, user, checkout, auth }) => {
    const {
        name,
        email,
        phone,
        address,
        selectedAddress,
        city,
        zip,
        state,
        errors,
        geo_code_loading
    } = shippingForm;

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

export default connect(mapStateToProps, actions)(ShippingForm);