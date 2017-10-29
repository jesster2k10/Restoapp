import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    currentUser: {
        name: {
            first: 'EMPTY_NAME',
            last: 'EMPTY_NAME'
        },
    },
    addresses: [],
    get_addresses_loading: false,
    get_addresses_success: false,
    get_addresses_error: null,
    add_address_success: false,
    add_address_loading: false,
    add_address_error: null,
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_CURRENT_USER:
            return {...state, loading: true, error: null};
        case Types.GET_CURRENT_USER_SUCCESS:
            return {...state, loading: false, currentUser: action.payload, error: null};
        case Types.GET_CURRENT_USER_FAILED:
            return {...state, loading: false, error: action.payload};
        case Types.ADD_ADDRESS:
            return {...state, add_address_success: false, add_address_loading: true, add_address_error: null};
        case Types.ADD_ADDRESS_FAILED:
            return {...state, add_address_success: false, add_address_loading: false, add_address_error: action.payload};
        case Types.ADD_ADDRESS_SUCCESS:
            return {...state, add_address_success: true, add_address_loading: false, add_address_error: null};
        case Types.GET_ADDRESSES:
            return {...state, get_addresses_loading: true, get_addresses_error: null, get_addresses_success: false};
        case Types.GET_ADDRESSES_FAILED:
            return {...state, get_addresses_loading: false, get_addresses_error: action.payload, get_addresses_success: false};
        case Types.GET_ADDRESSES_SUCCESS:
            return {...state, get_addresses_loading: false, get_addresses_error: null, addresses: action.payload, get_addresses_success: true};
        default:
            return state;
    }
};