/**
 * Created by jesseonolememen on 04/11/2017.
 */
import { all } from 'redux-saga/effects';
import orderSagas from './Orders';

const root = function* () {
    yield all([
        ...orderSagas,
    ])
};

export default root;
