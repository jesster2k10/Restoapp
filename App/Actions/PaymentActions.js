/**
 * Created by jesseonolememen on 18/10/2017.
 */
import axios from 'axios';
import * as Types from '../Config/ActionTypes';
import {
    saveStripeCustomerID,
    getStripeCustomerID,
} from '../Helpers';
import { createOrder } from './OrderActions';
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

const actions = {
    request: (service: string, token: string, parameters: Object) => ({ type: Types.PAYMENT_REQUEST, token, service, parameters }),
    success: (service: string, response) => ({ type: Types.PAYMENT_SUCCESS, service, response }),
    failure: (service: string, error: Error) => ({ type: Types.PAYMENT_FAILURE, service, error }),
};

export const getSavedCustomerId = () => (dispatch) => {
    dispatch({ type: Types.GET_SAVED_CUSTOMER_ID });

    getStripeCustomerID()
        .then(id => dispatch({ type: Types.GET_SAVED_CUSTOMER_ID_SUCCESS }))
        .catch(error => dispatch({ type: Types.GET_SAVED_CUSTOMER_ID_FAILED }));
};

export const getBraintreeClientToken = () => dispatch => {
    dispatch({type: Types.GET_BRAINTREE_CLIENT_TOKEN});

    axios.post(`${Constants.BASE_API_URL}/payments/braintree/client_token`, { token: Constants.ACCESS_TOKEN })
        .then(({data}) => {
            if (data.success === false) {
                dispatch({type: Types.GET_BRAINTREE_CLIENT_TOKEN_FAILED, error: data.error});
            } else {
                dispatch({type: Types.GET_BRAINTREE_CLIENT_TOKEN_SUCCESS, token: data.token});
            }
        }).catch(error => {
        dispatch({type: Types.GET_BRAINTREE_CLIENT_TOKEN_FAILED, error});
    });
};

export const makeBraintreePayment = (nonce, token, amount, order) => (dispatch) => {
    dispatch({ type: Types.MAKE_BRAINTREE_PAYMENT });

    axios.post(`${Constants.BASE_API_URL}/payments/braintree`, { nonce, token, amount: amount.toFixed(2) })
        .then(({ data }) => {
            if (data.success === false || data.message) {
                dispatch({ type: Types.MAKE_BRAINTREE_PAYMENT_FAILED, payload: data.message })
            } else {
                dispatch({ type: Types.MAKE_BRAINTREE_PAYMENT_SUCCESS, payload: data.result });
                dispatch(createOrder(order, token));
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.MAKE_BRAINTREE_PAYMENT_FAILED, payload: message })
        })

};

export const makePayment = (stripeToken, authToken, amount, currency, order) => (dispatch) => {
    dispatch({ type: Types.MAKE_PAYMENT });

    axios.post(`${Constants.BASE_API_URL}/payments`, { token: authToken || Constants.ACCESS_TOKEN, stripeToken, amount, currency })
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.MAKE_PAYMENT_FAILED, payload: data.error })
            } else {
                dispatch({ type: Types.MAKE_PAYMENT_SUCCESS, payload: data.charge });
                dispatch(createOrder(order, authToken || Constants.ACCESS_TOKEN))
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.MAKE_PAYMENT_FAILED, payload: message })
        })
};

export const createCustomer = (authToken, source, email, userId, order) => (dispatch) => {
    dispatch({ type: Types.CREATE_CUSTOMER });

    axios(generateConfig('POST', 'payments/customer', authToken, true))
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.CREATE_CUSTOMER_FAILED, payload: data.error })
            } else {
                saveStripeCustomerID(data.customer_id)
                    .then(() => {
                        dispatch({ type: Types.CREATE_CUSTOMER_SUCCESS, payload: data.customer_id })
                        dispatch(createOrder(order, token));
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

export const chargeCustomer = (authToken, customer, amount, currency, order) => (dispatch) => {
    dispatch({ type: Types.CHARGE_CUSTOMER });

    axios(generateConfig('POST', 'payments/customer/charge', authToken, true))
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.CHARGE_CUSTOMER_FAILED, payload: data.error })
            } else {
                dispatch({ type: Types.CHARGE_CUSTOMER_SUCCESS, payload: data.charge })
                dispatch(createOrder(order, token))
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

export const makeCashPayment = (order, token) => async dispatch => {
    dispatch(actions.request('cash_payment', token, order));

    const transaction = {
        paymentMethod: 'CASH',
        transactionDate: new Date(),
        status: 'PENDING',
    };

    try {
        let { data } = await axios.post(`${Constants.BASE_API_URL}/transactions`, { token, ...transaction });

        if (data.success === false) {
            dispatch(actions.failure('cash_payment', data.error));
        } else {
            dispatch(actions.success('cash_payment', data.results));

            let newOrder = order;
            newOrder.transaction = data.results._id;
            newOrder.status = 'Pending';
            newOrder.type = order.type.charAt(0).toUpperCase() + order.type.slice(1).toLowerCase();

            dispatch(createOrder(newOrder, token));
        }
    } catch (error) {
        if (error.response.data.success === false) {
            dispatch(actions.failure('cash_payment', error.response.data.error));
        } else {
            dispatch(actions.failure('cash_payment', error.message));
        }
    }
};

export default actions;