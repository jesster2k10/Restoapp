/**
 * Created by jesseonolememen on 22/11/2017.
 */
import { call } from 'redux-saga/effects';
import Api from '../Networking/API';
import * as sagas from './Orders';

const api = new Api();

test('create order', () => {
    const generator = sagas.createOrder({ order: 'order' }, 'token');
    expect(generator.next().value).toBe(call(api.createOrder, { order: 'order' }, 'token'))
});