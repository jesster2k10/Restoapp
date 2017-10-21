/**
 * Created by jesseonolememen on 18/10/2017.
 */
import axios from 'axios';
import * as Types from '../Config/ActionTypes';
import {
    saveStripeCustomerID,
    getStripeCustomerID,
    removeStripeCustomerID
} from '../Helpers';
import Constants from '../Config/Constants';

const generateConfig = (method = 'POST', endpoint, token, requiresToken, headers, data) => ({
    method,
    url: `${Constants.BASE_API_URL}/${endpoint}`,
    headers: {
        'x-access-token': requiresToken ? token : Constants.ACCESS_TOKEN || token,
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
    },
    json: true,
    data: {
        ...data
    }
});

export const getSavedCustomerId = () => (dispatch) => {
    dispatch({ type: Types.GET_SAVED_CUSTOMER_ID });

    getStripeCustomerID()
        .then(id => dispatch({ type: Types.GET_SAVED_CUSTOMER_ID_SUCCESS }))
        .catch(error => dispatch({ type: Types.GET_SAVED_CUSTOMER_ID_FAILED }));
};

export const makePayment = (stripeToken, authToken, amount, currency) => (dispatch) => {
    dispatch({ type: Types.MAKE_PAYMENT });

    axios.post(`${Constants.BASE_API_URL}/payments`, { token: authToken || Constants.ACCESS_TOKEN, stripeToken, amount, currency })
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.MAKE_PAYMENT_FAILED, payload: data.error })
            } else {
                dispatch({ type: Types.MAKE_PAYMENT_SUCCESS, payload: data.charge })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.MAKE_PAYMENT_FAILED, payload: message })
        })
};

export const createCustomer = (authToken, source, email, userId) => (dispatch) => {
    dispatch({ type: Types.CREATE_CUSTOMER });

    axios(generateConfig('POST', 'payments/customer', authToken, true))
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.CREATE_CUSTOMER_FAILED, payload: data.error })
            } else {
                saveStripeCustomerID(data.customer_id)
                    .then(() => {
                        dispatch({ type: Types.CREATE_CUSTOMER_SUCCESS, payload: data.customer_id })
                    })
                    .catch(({ message }) => {
                        dispatch({ type: Types.CREATE_CUSTOMER_FAILED, payload: message })
                    })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.CREATE_CUSTOMER_FAILED, payload: message })
        })
};

export const chargeCustomer = (authToken, customer, amount, currency) => (dispatch) => {
    dispatch({ type: Types.CHARGE_CUSTOMER });

    axios(generateConfig('POST', 'payments/customer/charge', authToken, true))
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.CHARGE_CUSTOMER_FAILED, payload: data.error })
            } else {
                dispatch({ type: Types.CHARGE_CUSTOMER_SUCCESS, payload: data.charge })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.CHARGE_CUSTOMER_FAILED, payload: message })
        })
};

export const getPaymentCards = (customer, authToken) => (dispatch) => {
    dispatch({ type: Types.GET_PAYMENT_CARDS });

    axios(generateConfig('GET', 'payments/customer/cards', authToken, true, { 'x-cust-id': customer }))
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.GET_PAYMENT_CARDS_FAILED, payload: data.error })
            } else {
                dispatch({ type: Types.GET_PAYMENT_CARDS_SUCCESS, payload: data.charge })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_PAYMENT_CARDS_FAILED, payload: message })
        })
};