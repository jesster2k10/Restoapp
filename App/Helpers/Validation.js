/**
 * Created by jesseonolememen on 20/08/2017.
 */
export const Patterns = {
    FULL_NAME: /^[a-zA-Z-'. ]+$/,
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PHONE_NUMBER: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
    ADDRESS: /^[a-zA-Z0-9\s,'-.]*$/,
    ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    COUNTRY: /^[a-zA-Z'_ \p{L}]*$/
};

const validate = (arg, pattern) => (pattern.test(arg));

export const validatePhone = (phone) => (validate(phone, Patterns.PHONE_NUMBER));
export const validateEmail = (email) => (validate(email, Patterns.EMAIL));
export const validateName = (name) => (validate(name, Patterns.FULL_NAME));
export const validateAddress = (address) => (validate(address, Patterns.ADDRESS));
export const validateZip = (zip) => (validate(zip, Patterns.ZIP_CODE));
export const validateCountry = (country) => (validate(country, Patterns.COUNTRY));
export const validatePassword = (password) => (validate(password, Patterns.PASSWORD));