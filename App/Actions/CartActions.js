/**
 * Created by jesseonolememen on 12/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';
import * as helpers from '../Helpers';

export const createCart = () => (dispatch) => {
    dispatch({ type: Types.CREATE_CART });

    const options = {
        method: 'POST',
        url: `${Constants.BASE_API_URL}/carts`,
        headers: {
            'x-access-token': Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.CREATE_CART_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.CREATE_CART_SUCCESS, payload: data.results })
                dispatch(getCart(data.results._id));
                helpers.saveCart(data.results._id, null);
            }
        })
        .catch(error => {
            dispatch({ type: Types.CREATE_CART_FAILED, payload: error })
        })
};

export const getSavedCart = () => (dispatch)  => {
    dispatch({ type: Types.GET_SAVED_CART });

    helpers.getCart((cart, error) => {
        if (cart) {
            dispatch({ type: Types.GET_SAVED_CART_SUCCESS, payload: cart });
            dispatch(getCart(cart));
        } else {
            dispatch({ type: Types.GET_SAVED_CART_FAILED });
            dispatch(createCart());
        }
    })
};

export const clearRemoveErrors = () => ({ type: Types.CLEAR_REMOVE_ERRORS });
export const clearAddErrors = () => ({ type: Types.CLEAR_ADD_ERRORS });

export const getCart = (cart) => (dispatch) => {
    dispatch({ type: Types.GET_CART });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/cart/${cart}`,
        headers: {
            'x-access-token': Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success == false) {
                dispatch({ type: Types.GET_CART_FAILED, payload: data.error });
            } else {
                dispatch({ type: Types.GET_CART_SUCCESS, payload: data.results });
            }
        })
        .catch(error => {
            dispatch({ type: Types.GET_CART_FAILED, payload: error });
        });
};

export const addMealToCart = (cart, { _id }, option) => (dispatch) => {
    dispatch({ type: Types.ADD_MEAL_TO_CART });

    axios.patch(`${Constants.BASE_API_URL}/carts/${cart}/products`, { product: _id, option: option })
        .then(({ data }) => {
            if (data.results === undefined) {
                dispatch({ type: Types.ADD_MEAL_TO_CART_FAILED, payload: data.error });
            } else {
                dispatch(getCart(cart));
                dispatch({ type: Types.ADD_MEAL_TO_CART_SUCCESS, payload: data });
            }
        })
        .catch(error => {
            dispatch({ type: Types.ADD_MEAL_TO_CART_FAILED, payload: error });
        });
};

export const removeMealFromCart = (token, cart, product) => (dispatch) => {
    dispatch({ type: Types.REMOVE_MEAL_FROM_CART });

    const options = {
        method: 'DELETE',
        url: `${Constants.BASE_API_URL}/carts/${cart}/products`,
        headers: {
            'x-access-token': token || Constants.ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        data: {
            product: product._id
        }
    };

    axios(options)
        .then(({ data }) => {
            if (data.success == false || !data.results) {
                dispatch({ type: Types.REMOVE_MEAL_FROM_CART_FAILED, payload: data.error.message });
            } else {
                dispatch({ type: Types.REMOVE_MEAL_FROM_CART_SUCCESS });
                dispatch(getCart(cart));
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.REMOVE_MEAL_FROM_CART_FAILED, payload: message });
        });
};

export const resetCart = (token, cart) => (dispatch) => {
    dispatch({ type: Types.RESET_CART });

    const options = {
        method: 'DELETE',
        url: `${Constants.BASE_API_URL}/carts/${cart}/products/all`,
        headers: {
            'x-access-token': token || Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true,
    };

    axios(options)
        .then(({ data }) => {
            if (data.success == false) {
                dispatch({ type: Types.RESET_CART_FAILED, payload: data.error });
            } else {
                dispatch({ type: Types.RESET_CART_SUCCESS });
                dispatch(getCart(cart));
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.RESET_CART_FAILED, payload: message });
        });
};

export const clearResetErrors = () => ({ type: Types.CLEAR_RESET_ERRORS });