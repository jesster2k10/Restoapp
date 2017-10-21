/**
 * Created by jesseonolememen on 24/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import strings from '../Config/Localization';
import {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    validateAddress,
    validateCountry
} from '../Helpers/Validation';

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
        return { type: Types.CHANGE_NAME_FAILED, name, key };
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