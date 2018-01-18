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
import styles, { countryPickerStyles } from './Styles/ShippingFormStyles';
import CountryPicker from 'react-native-country-picker-modal';
import Spinner from 'react-native-spinkit';
import countries from '../../Config/countries.json';

const KEY = 'SHIPPING';

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
            userLoggedIn
        } = this.props;

        if (user && userLoggedIn && user.name) {
            let name = `${user.name.first} ${user.name.last && user.name.last != 'BLANK_NAME' ? user.name.last : ''}`

            if (name != '') {
                changeName(false, name, 'SHIPPING');
            }
        }

        if (user && user.email) {
            changeEmail(false, user.email, 'SHIPPING');
        }

        if (user && user.phone) {
            changePhone(false, user.phone, 'SHIPPING')
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
            userLoggedIn
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
                <Section top={5} bottom={20}>
                    <RowHeader capital center textStyle={styles.header} spacing={4}>All Fields are required</RowHeader>
                </Section>
                { user && userId && token && userLoggedIn && method == 'DELIVERY'  ? (
                        <Section bottom={25}>
                            <View style={styles.rowContainer}>
                                <Row
                                    title={strings.useSavedAddress}
                                    body={strings.selectAddress}
                                    style={styles.row}
                                    disclosure
                                    first
                                    action={() => this.props.navigation.navigate('SelectAddress')}
                                />
                            </View>
                        </Section>
                    ) : null }
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
                { method === 'DELIVERY' ? (
                        <View>
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
                                    error={errors.state}
                                    value={postcode}
                                    returnKeyType="done"
                                    autoCapitalize="words"
                                    placeholder={ strings.enterState }
                                    onChangeText={(val) => changeState(val, KEY)}>
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

const mapStateToProps = ({ shippingForm, user, checkout, auth }) => {
    const {
        name,
        email,
        phone,
        address,
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