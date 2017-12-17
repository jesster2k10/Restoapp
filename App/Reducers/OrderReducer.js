import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    orders: [],
    loading: false,
    create_order_loading: false,
    create_order_error: null,
    create_order_success: false,
    placedOrder: null
};

export default (state = INITIAL_STATE, action) => {
    if (action.service === 'create') {
        switch (action.type) {
            case Types.ORDER_REQUEST:
                return { ...state, create_order_loading: true, create_order_error: null, create_order_success: false };

            case Types.ORDER_SUCCESS:
                return { ...state, create_order_loading: false, create_order_error: null, create_order_success: true, placedOrder: action.response };

            case Types.ORDER_FAILED:
                return { ...state, create_order_loading: false, create_order_error: action.error.message, create_order_success: false, placedOrder: null };
        }
    }

    switch (action.type) {
        case Types.GET_ORDERS:
            return { ...state, loading: true, orders: [], error: null };
        case Types.GET_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };
        case Types.GET_ORDERS_FAILED:
            return { ...state, loading: false, orders: [], error: action.payload };
        default:
            return state;
    }
};