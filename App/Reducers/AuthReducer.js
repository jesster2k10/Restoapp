import * as Types from '../Config/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants'
import Constants from '../Config/Constants';

const INITIAL_STATE = {
    token: Constants.ACCESS_TOKEN,
    facebook_error: null,
    google_error: null,
    success: false,
    loading: false,
    userLoggedIn: null,
    logout_error: null,
    logout_success: false,
    register_error: null,
    register_success: false,
    register_loading: null,
    login_loading: null,
    requested_logout: false,
    userId: '',
    requested_user_login: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            let incoming = action.payload.auth;
            if (incoming) {
                return {...state, facebook_error: null, login_success: false, login_error: null, google_error: null, success: false, loading: false, logout_error: null, logout_success: false, requested_logout: false, ...incoming, userLoggedIn: false}
            }
            return state;
        case Types.REGISTER:
            return {...state, register_loading: true, register_success: false, register_error: null, logout_success: false,};
        case Types.REGISTER_FAILED:
            return {...state, register_loading: false, register_success: false, register_error: action.payload};
        case Types.REGISTER_SUCCESS:
            return {...state, register_loading: false, register_success: true, register_error: null, userLoggedIn: true, token: action.token, userId: action.user._id};
        case Types.LOG_OUT:
            return {...state, loading: true, logout_success: false, logout_error: null, requested_logout: true};
        case Types.LOG_OUT_FAILED:
            return {...state, loading: false, logout_success: false, logout_error: action.payload, requested_logout: true};
        case Types.LOG_OUT_SUCCESS:
            return {...INITIAL_STATE, loading: false, logout_success: true, logout_error: null, requested_logout: true, userLoggedIn: false, userId: '', token: Constants.ACCESS_TOKEN};
        case Types.LOGIN:
            return {...state, login_loading: true, login_success: false, login_error: null, logout_success: false,};
        case Types.LOGIN_FAILED:
            return {...state, login_loading: false, login_success: false, login_error: action.payload, };
        case Types.LOGIN_SUCCESS:
            return {...state, login_loading: false, login_success: true, login_error: null, token: action.payload, userLoggedIn: true, userId: action.userId};
        case Types.GOOGLE_SIGN_IN:
            return {...state, loading: true, google_error: null, success: false, requested_logout: false};
        case Types.GOOGLE_SIGN_IN_FAILED:
            return {...state, loading: false, google_error: action.error, success: false, requested_logout: false};
        case Types.GOOGLE_SIGN_IN_SUCCESS:
            return {...state, token: action.payload, loading: false, google_error: null, success: true, requested_logout: false, userLoggedIn: true};
        case Types.FACEBOOK_SIGN_IN:
            return {...state, loading: true, facebook_error: null, success: false, requested_logout: false};
        case Types.FACEBOOK_SIGN_IN_FAILED:
            return {...state, loading: false, facebook_error: action.error, success: false, requested_logout: false };
        case Types.FACEBOOK_SIGN_IN_SUCCESS:
            return {...state, token: action.payload, loading: false, facebook_error: null, success: true, requested_logout: false, userLoggedIn: true };
        case Types.IS_USER_LOGGED_IN:
            return {...state, userLoggedIn: action.payload, requested_user_login: true, token: action.token || Constants.ACCESS_TOKEN, userId: action.userId };
        default:
            return state;
    }
};