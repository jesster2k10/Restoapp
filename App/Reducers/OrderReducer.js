import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    orders: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_ORDERS:
            return { ...state, loading: true, orders: [], error: null };
        case Types.GET_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };
        case Types.GET_ORDERS_FAILED:
            return { ...state, loading: false, orders: [], error: action.payload }
        default:
            return state;
    }
};