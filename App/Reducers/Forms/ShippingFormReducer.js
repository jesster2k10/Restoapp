import * as Types from '../../Config/ActionTypes';
import { omit } from 'lodash';

const INITIAL_STATE = {
    errors: {

    },
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    valid: false,
    method: 'DELIVERY',
    geo_code_error: null,
    geo_code_loading: false,
    geo_code_success: false,
    geo_code_location: null,
};

const isFormValid = (state) => {
    if (state.method === 'DELIVERY') {
        return Object.keys(state.errors).length == 0
            && state.name
            && state.email
            && state.phone
            && state.address
            && state.city
            && state.state
            && state.zip
    } else {
        return Object.keys(state.errors).length == 0
            && state.name
            && state.email
            && state.phone
    }
};

export default (state = INITIAL_STATE, action) => {
    if (action.key === 'SHIPPING') {
        switch (action.type) {
            case Types.CHANGE_NAME:
                return {...state, name: action.name, errors: omit(state.errors, 'name'), valid: isFormValid(state)};

            case Types.CHANGE_NAME_FAILED:
                return {...state, name: action.name, errors: {...state.errors, name: action.error }, valid: isFormValid(state)};

            case Types.CHANGE_EMAIL:
                return {...state, email: action.email, errors: omit(state.errors, 'email'), valid: isFormValid(state)};

            case Types.CHANGE_EMAIL_FAILED:
                return {...state, email: action.email, errors: {...state.errors, email: action.error }, valid: isFormValid(state)};

            case Types.CHANGE_PHONE:
                return {...state, phone: action.phone, errors: omit(state.errors, 'phone'), valid: isFormValid(state)};

            case Types.CHANGE_PHONE_FAILED:
                return {...state, phone: action.phone, errors: {...state.errors, phone: action.error }, valid: isFormValid(state)};

            case Types.CHANGE_ADDRESS:
                return {...state, address: action.address, errors: omit(state.errors, 'address'), valid: isFormValid(state)};

            case Types.CHANGE_ADDRESS_FAILED:
                return {...state, address: action.address, errors: {...state.errors, address: action.error }, valid: isFormValid(state)};

            case Types.CHANGE_ZIP:
                return {...state, zip: action.zip, valid: isFormValid(state)};

            case Types.CHANGE_CITY:
                return {...state, city: action.city, valid: isFormValid(state)};

            case Types.CHANGE_STATE:
                return {...state, state: action.state, valid: isFormValid(state)};

            case Types.CHANGE_COUNTRY:
                return {...state, country: action.country, valid: isFormValid(state)};

            case Types.CHANGE_COUNTRY_FAILED:
                return {...state, country: action.country, errors: {...state.errors, country: action.error }, valid: isFormValid(state)};

            default:
                return state;
        }
    } else {
        switch (action.type) {
            case Types.SELECT_ADDRESS:
                return {...state, address: action.payload};
            case Types.SELECT_DELIVERY_TYPE:
                return {...state, method: action.payload}
            case Types.GEO_CODE_ADDRESS:
                return {...state, geo_code_success: false, geo_code_loading: true, geo_code_error: null, geo_code_location: null};
            case Types.GEO_CODE_ADDRESS_FAILED:
                return {...state, geo_code_success: false, geo_code_loading: false, geo_code_error: action.payload, geo_code_location: null};
            case Types.GEO_CODE_ADDRESS_SUCCESS:
                return {...state, geo_code_success: true, geo_code_loading: false, geo_code_error: null, geo_code_location: action.payload};
        }
        return state;
    }
};