/**
 * Created by jesseonolememen on 04/11/2017.
 */
import { call, put, fork, take } from 'redux-saga/effects';
import orderActions from '../Actions/OrderActions';
import Api from '../Networking/API';
import {
    ORDER_REQUEST,
} from '../Config/ActionTypes';
import Constants from '../Config/Constants';

const api = new Api();

const createOrder = function* (order, token = Constants.ACCESS_TOKEN) {
    try {
        const order = yield call(api.createOrder, order, token);
        yield put(orderActions.success('create', order));
    } catch (error) {
        yield put(orderActions.failure('create', error));
    }
};

const createOrderListener = function* () {
    while (true) {
        const { order, token } = yield take(ORDER_REQUEST);

        yield call(createOrder, order, token);
    }
};

const root = function* () {
    yield fork(createOrderListener);
};

export default root;

export {
    createOrder,
}