/**
 * Created by jesseonolememen on 21/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Api from '../Networking/API';
import Constants from '../Config/Constants';
import { addAddress } from './UserActions';
import { resetCart } from './CartActions';
import axios from 'axios';

const api = new Api();

const actions = {
    order: () => ({ type: Types.ORDER }),
        failure: (service, error) => ({ type: Types.ORDER_FAILED, service, error }),
        success: (service, response) => ({ type: Types.ORDER_SUCCESS, service, response }),
        request: (service, order, token) => ({ type: Types.ORDER_REQUEST, service, order, token }),
};

export const getOrders = (token, userId) => (dispatch) => {
    dispatch({ type: Types.GET_ORDERS });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/orders/user/${userId}`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.results != undefined) {
                let results = data.results.map(result => {
                    let products = result.products || [];

                    if (result.products != undefined) {
                        products = [...result.products.reduce( (mp, o) => {
                            if (!mp.has(o._id)) mp.set(o._id, Object.assign({ count: 0 }, o));
                            mp.get(o._id).count++;
                            return mp;
                        }, new Map).values()];
                    }

                    let newResult = result;
                    newResult["products"] = products;

                    return newResult
                });

                dispatch({type: Types.GET_ORDERS_SUCCESS, payload: results })
            } else {
                dispatch({type: Types.GET_ORDERS_FAILED, payload: data.message })
            }
        })
        .catch(({ message }) => {
            dispatch({type: Types.GET_ORDERS_FAILED, payload: message })
        })
};

export const createOrder = (order, token) => async dispatch => {
    dispatch(actions.request('service', order, token));

    try {
        const result = await api.createOrder(order, token);
        dispatch(actions.success('create', result));
        dispatch(addAddress(order.deliveryAddress));
        dispatch(resetCart());
    } catch (error) {
        dispatch(actions.failure('create', error));
    }
};

export default actions;