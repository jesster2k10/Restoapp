
/**
 * Created by jesseonolememen on 24/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import strings from '../Config/Localization';
import Constants from '../Config/Constants';
import {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    validateAddress,
    validateCountry
} from '../Helpers/Validation';
import Geocoder from '../Networking/Geocoder';

const geocoder = new Geocoder(Constants.GEO_CODER_API_KEY);

export const resetAddressForm = () => ({ type: Types.ADDRESS_RESET });

export const geoCodeAddress = (streetName, postalCode, locality) => async (dispatch) => {
    dispatch({ type: Types.GEO_CODE_ADDRESS });

    try {
        const result = await geocoder.geocodeAddress(`${streetName}+${locality}+${postalCode}+${Constants.COUNTRY.NAME}`);

        if (typeof result === Array) {
            if (result.length > 0) {
                dispatch({ type: Types.GEO_CODE_ADDRESS_SUCCESS, payload: result[0] });
            } else {
                dispatch({ type: Types.GEO_CODE_ADDRESS_FAILED, payload: 'No Results Found' });
            }
        }

        if (result) {
            dispatch({ type: Types.GEO_CODE_ADDRESS_SUCCESS, payload: result });
        } else {
            dispatch({ type: Types.GEO_CODE_ADDRESS_FAILED, payload: 'No Results Found' });
        }
    }

    catch (e) {
        dispatch({ type: Types.GEO_CODE_ADDRESS_FAILED, payload: e.message });
    }
};

export const selectAddress = (validate, address, key = 'SHIPPING') => (dispatch) => {
    if (address.phone) {
        dispatch(changePhone(validate, address.phone, key));
    }

    if (address.name) {
        let fullName = `${address.name.first} ${address.name.last ? address.name.last : ''}`;
        dispatch(changeName(validate, fullName, key));
    }

    if (address.address.street1) {
        dispatch(changeAddress(validate, address.address.street1, key));
    }

    if (address.address.suburb) {
        dispatch(changeCity(address.address.suburb, key));
    }

    if (address.address.postcode) {
        dispatch(changeZip(address.address.postcode, key));
    }

    if (address.address.state) {
        dispatch(changeState(address.address.state, key));
    }

    if (address.address.country) {
        dispatch(changeCountry(validate, address.address.country, key));
    }
};

export const changePassword = (validate, password, key = 'LOGIN') => {
    if (validate) {
        if (validatePassword(password) && password.length > 7) {
            return { type: Types.CHANGE_PASSWORD, password, key };
        } else {
            if (password.length < 8) {
                return { type: Types.CHANGE_PASSWORD_FAILED, error: strings.passwordTooShort, password, key}
            }

            if (!validatePassword(password)) {
                return { type: Types.CHANGE_PASSWORD_FAILED, error: strings.weakPassword, password, key }
            }
        }
    } else {
        return { type: Types.CHANGE_PASSWORD, key, password };
    }
};

export const changeName = (validate, name, key = 'LOGIN') => {
    if (validate) {
        if (validateName(name) && name.length > 0) {
            return { type: Types.CHANGE_NAME, name, key };
        } else {
            if (name.length < 1) {
                return { type: Types.CHANGE_NAME_FAILED, key, error: strings.formatString(strings.required, 'A name'), name}
            }

            if (!validateName(name)) {
                return { type: Types.CHANGE_NAME_FAILED, key, error: strings.invalidName, name }
            }
        }
    } else {
        return { type: Types.CHANGE_NAME, name, key };
    }
};

export const changeEmail = (validate, email, key = 'LOGIN') => {
    if (validate) {
        if (validateEmail(email) && email.length > 0) {
            return { type: Types.CHANGE_EMAIL, email, key };
        } else {
            if (email.length < 1) {
                return { type: Types.CHANGE_EMAIL_FAILED, key, error: strings.formatString(strings.required, 'An email address'), email}
            }

            if (!validateEmail(email)) {
                return { type: Types.CHANGE_EMAIL_FAILED, key, error: strings.invalidEmail, email: email.toLowerCase() }
            }
        }
    } else {
        return { type: Types.CHANGE_EMAIL, key, email: email.toLowerCase() };
    }
};

export const changePhone = (validate, phone, key = 'SHIPPING') => {
    if (validate) {
        if (validatePhone(phone) && phone.length > 0) {
            return { type: Types.CHANGE_PHONE, phone, key };
        } else {
            if (phone.length < 1) {
                return { type: Types.CHANGE_PHONE_FAILED, key, error: strings.formatString(strings.required, 'A phone'), phone}
            }

            if (!validatePhone(phone)) {
                return { type: Types.CHANGE_PHONE_FAILED, key, error: strings.invalidPhone, phone }
            }
        }
    } else {
        return { type: Types.CHANGE_PHONE, key, phone };
    }
};

export const changeAddress = (validate, address, key = 'SHIPPING') => {
    if (validate) {
        if (validateAddress(address) && address.length > 0) {
            return { type: Types.CHANGE_ADDRESS, address, key };
        } else {
            if (address.length < 1) {
                return { type: Types.CHANGE_ADDRESS_FAILED, key, error: strings.formatString(strings.required, 'An address'), address}
            }

            if (!validateAddress(address)) {
                return { type: Types.CHANGE_ADDRESS_FAILED, key, error: strings.invalidAddress, address }
            }
        }
    } else {
        return { type: Types.CHANGE_ADDRESS, key, address };
    }
};

export const changeZip = (zip, key = 'SHIPPING') => ({ type: Types.CHANGE_ZIP, zip, key });
export const changeCity = (city, key = 'SHIPPING') => ({ type: Types.CHANGE_CITY, city, key });
export const changeState = (state, key = 'SHIPPING') => ({ type: Types.CHANGE_STATE, state, key });

export const changeCountry = (validate, country, key = 'SHIPPING') => {
    if (validate) {
        if (country.length > 0 && validateCountry(country)) {
            return { type: Types.CHANGE_COUNTRY, country, key };
        } else {
            if (country.length < 1) {
                return { type: Types.CHANGE_COUNTRY_FAILED, country, key, error: strings.formatString(strings.required, 'An country')};
            }

            if (!validateCountry(country)) {
                return { type: Types.CHANGE_COUNTRY_FAILED, country, key, error: strings.invalidCountry};
            }
        }
    } else {
        return { type: Types.CHANGE_COUNTRY, country, key }
    }
};

export const selectPreviousAddress = (address) => ({ type: Types.SELECT_ADDRESS, payload: address });
export const resetSelectAddressDone = (address) => ({ type: Types.RESET_SELECT_ADDRESS_DONE });

export const clearCheckout = () => ({ type: Types.CLEAR_CHECKOUT });