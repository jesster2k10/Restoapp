import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    currentUser: null,
    addresses: [],
    get_addresses_loading: false,
    get_addresses_success: false,
    get_addresses_error: null,
    add_address_success: false,
    add_address_loading: false,
    add_address_error: null,
    loading: false,
    error: null,
    changePasswordSuccess: false,
    changePasswordLoading: false,
    changePasswordError: null,
    changeNameError: null,
};

const splitName = name => {
    var first = name.split(' ').slice(0, -1).join(' ');
    var last = name.split(' ').slice(-1).join(' ');

    return {
        first,
        last,
    }
};

export { INITIAL_STATE };

export default (state = INITIAL_STATE, action) => {
    if (action.key == 'PROFILE') {
        switch (action.type) {
            case Types.CHANGE_NAME:
                return {...state, currentUser: {...state.currentUser, name: splitName(action.name) }};
            case Types.CHANGE_NAME_FAILED:
                return {...state, changeNameError: action.error, currentUser: {...state.currentUser, name: splitName(action.name) }};
            default:
                return state;
        }
    }

    switch (action.type) {
        case Types.LOG_OUT_SUCCESS:
            return INITIAL_STATE;
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
        case Types.CHANGE_USER_PASSWORD:
            return {...state, changePasswordError: null, changePasswordLoading: true, changePasswordSuccess: false};
        case Types.CHANGE_USER_PASSWORD_FAILED:
            return {...state, changePasswordError: action.payload, changePasswordLoading: false, changePasswordSuccess: false};
        case Types.CHANGE_USER_PASSWORD_SUCCESS:
            return {...state, changePasswordError: null, changePasswordLoading: false, changePasswordSuccess: true};
        case Types.UPDATE_USER_PROFILE: 
            return {...state, updateUserProfileError: null, updateUserProfileSuccess: false, updateUserLoading: true};
        case Types.UPDATE_USER_PROFILE_SUCCESS: 
            return {...state, updateUserProfileError: null, updateUserProfileSuccess: true, updateUserLoading: false, currentUser: { ...state.currentUser, profileImage: action.profileImage }};
        case Types.UPDATE_USER_PROFILE_FAILED:
            return {...state, updateUserProfileError: action.error, updateUserProfileSuccess: false, updateUserLoading: false,};
        case Types.UPDATE_USER: 
            return {...state, updateUserLoading: true, updateUserError: null, updateUserSuccess: false};
        case Types.UPDATE_USER_FAILED:
            return {...state, updateUserLoading: false, updateUserError: action.error, updateUserSuccess: false};
        case Types.UPDATE_USER_SUCCESS:
            return {...state, updateUserLoading: false, updateUserError: null, updateUserSuccess: true, currentUser: action.user};
        default:
            return state;
    }
};