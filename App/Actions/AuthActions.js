/**
 * Created by jesseonolememen on 21/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import axios from 'axios';
import Constants from '../Config/Constants';
import {
    signInWithFacebook as facebookSignIn,
    signInWithGoogle as googleSignIn,
    isUserLoggedIn,
    saveUserToken,
    removeUserToken,
    clearCart
} from '../Helpers';
import {
    getCurrentUser
} from './UserActions';

export const checkForAuth = () => (dispatch) => {
    isUserLoggedIn()
        .then(token => {
            axios.post(`${Constants.BASE_API_URL}/auth/session/verify/`, { token })
                .then(({ data }) => {
                    dispatch({ type: Types.IS_USER_LOGGED_IN, payload: data.success, token, userId: data.decoded._id });

                    if (data.success === true) {
                        dispatch(getCurrentUser(token, data.decoded._id));
                    }
                })
                .catch(({ message, response }) => {
                    if (!response || message === "Network Error" && token) {
                        // network error
                        dispatch({ type: Types.IS_USER_LOGGED_IN, payload: true })
                    } else {
                        dispatch({ type: Types.IS_USER_LOGGED_IN, payload: false });
                    }
                })
        })
        .catch(() => {
            dispatch({ type: Types.IS_USER_LOGGED_IN, payload: false });
        })
};

export const logout = (token) => (dispatch) => {
    dispatch({ type: Types.LOG_OUT });

    axios.delete(`${Constants.BASE_API_URL}/auth/session/delete`, { data: { token }})
        .then(({ data }) => {
            if (data.signed_out == true) {
                removeUserToken()
                    .then(() => {
                        clearCart()
                            .then(() => {
                                dispatch({ type: Types.LOG_OUT_SUCCESS });
                            })
                            .catch((error) => {
                                dispatch({ type: Types.LOG_OUT_FAILED, payload: 'Failed to logout' });
                            });
                    })
                    .catch(({ message }) => {
                        console.log(message);
                        dispatch({ type: Types.LOG_OUT_FAILED, payload: 'Failed to logout' });
                    })

            } else {
                dispatch({ type: Types.LOG_OUT_FAILED, payload: data.error || null });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.LOG_OUT_FAILED, payload: message });
        })
};

export const signInWithFacebook = () => (dispatch) => {
    dispatch({ type: Types.FACEBOOK_SIGN_IN });

    facebookSignIn()
        .then(details => {

            axios.post(`${Constants.BASE_API_URL}/auth/facebook/`, { facebook_user: details[0], access_token: details[1].token })
                .then(({ data }) => {
                    if (data.success == false) {
                        dispatch({ type: Types.FACEBOOK_SIGN_IN, payload: data.error });
                    } else {
                        saveUserToken(data.token);
                        dispatch(getCurrentUser(data.token, data.userId));
                        dispatch({ type: Types.FACEBOOK_SIGN_IN_SUCCESS, payload: data.token });
                    }
                })
                .catch(({ message }) => {
                    dispatch({ type: Types.FACEBOOK_SIGN_IN_FAILED, error: message });
                })
        })
        .catch(({ message }) => {
            dispatch({ type: Types.FACEBOOK_SIGN_IN_FAILED, error: message });
        })
};

export const signInWithGoogle = () => (dispatch) => {
    dispatch({ type: Types.GOOGLE_SIGN_IN });

    googleSignIn()
        .then(details => {

            axios.post(`${Constants.BASE_API_URL}/auth/google/`, { google_user: details[0], access_token: details[1].token })
                .then(({ data }) => {
                    if (data.success == false) {
                        dispatch({ type: Types.GOOGLE_SIGN_IN, payload: data.error });
                    } else {
                        saveUserToken(data.token);
                        dispatch(getCurrentUser(data.token, data.userId));
                        dispatch({ type: Types.GOOGLE_SIGN_IN_SUCCESS, payload: data.token });
                    }
                })
                .catch(({ message }) => {
                    dispatch({ type: Types.GOOGLE_SIGN_IN_FAILED, error: message });
                })
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GOOGLE_SIGN_IN_FAILED, error: message });
        })
};

export const login = (email, password) => (dispatch) => {
    dispatch({ type: Types.LOGIN });

    axios.post(`${Constants.BASE_API_URL}/auth/session/create`, { username: email, password })
        .then(({ data }) => {
            if (data.success == false || data.token === null) {
                dispatch({ type: Types.LOGIN_FAILED, payload: data.message || data.error });
            } else {
                saveUserToken(data.token);
                dispatch(getCurrentUser(data.token, data.userId));
                dispatch({ type: Types.LOGIN_SUCCESS, payload: data.token, userId: data.userId });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.LOGIN_FAILED, payload: message });
        })
};

export const register = (email, password, name) => (dispatch) => {

};