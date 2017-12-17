/**
 * Created by jesseonolememen on 22/11/2017.
 */
import {
    call,
    fork,
    take,
    put,
} from 'redux-saga/effects'
import Database, { Endpoints, GetTokenHeader } from '../Networking/Database';
import {
    PAYMENT_FAILURE,
    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
} from '../Config/ActionTypes';
import {
    saveStripeCustomerID,
    getStripeCustomerID,
} from '../Helpers';
import paymentActions from '../Actions/PaymentActions';

const api = new Api();

const getSavedCustomerId = function* () {
    try {
        const customerId = yield call(getStripeCustomerID);
        yield put(paymentActions.success('stripe-customer-id', customerId));
    } catch (error) {
        yield put(paymentActions.failure('stripe-customer-id', error))
    }
};

const makeBraintreePayment = function* (parameters, token) {
    try {
        const result = yield call(Database.post, Endpoints.payments.braintree, GetTokenHeader(token), null, parameters);
        yield put(paymentActions.success('braintree-payment', result));
    } catch (error) {
        yield put(paymentActions.failure('braintree-payment', error))
    }
};

const makePayment = function* (parameters, token) {
    try {
        const result = yield call(Database.post, Endpoints.payments.index, GetTokenHeader(token), null, parameters);
        yield put(paymentActions.success('make-payment', result));
    } catch (error) {
        yield put(paymentActions.failure('make-payment', error));
    }
};

const createCustomer = function* (parameters, token) {
    try {
        const result = yield call(Database.post, Endpoints.payments.customer.index, GetTokenHeader(token), null, parameters);
        yield put(paymentActions.success('create-customer', result));
    } catch (error) {
        yield put(paymentActions.failure('create-customer', error));
    }
};

const chargeCustomer = function* (parameters, token) {
    try {
        const result = yield call(Database.post, Endpoints.payments.customer.charge, GetTokenHeader(token), null, parameters);
        yield put(paymentActions.success('charge-customer', result));
    } catch (error) {
        yield put(paymentActions.failure('charge-customer', error));
    }
};

const getPaymentCards = function* (parameters, token) {
    try {
        const result = yield call(Database.get, Endpoints.payments.customer.cards, GetTokenHeader(token), null, parameters);
        yield put(paymentActions.success('get-payment-cards', result));
    } catch (error) {
        yield put(paymentActions.failure('get-payment-cards', error));
    }
};

const makeBraintreePaymentWatcher = function* () {
    while (true) {
        const { parameters, token } = yield take(PAYMENT_REQUEST);
        yield call(makeBraintreePayment, parameters, token);
    }
};

const root = function* () {
  yield fork(makeBraintreePaymentWatcher);
  yield fork(makePaymentWatcher);
  yield fork(createCustomerWatcher);
  yield fork(chargeCustomerWatcher);
  yield fork(getPaymentCardsWatcher);
};

export {
    makeBraintreePayment,
    makePayment,
    createCustomer,
    chargeCustomer,
    getPaymentCards,
};

export default root;