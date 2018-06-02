/**
 * Created by jesseonolememen on 18/10/2017.
 */
import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    create_customer_success: false,
    create_customer_error: null,
    create_customer_loading: false,
    make_payment_success: false,
    make_payment_error: false,
    make_payment_loading: false,
    make_braintree_payment_success: false,
    make_braintree_payment_error: false,
    make_braintree_payment_loading: false,
    charge: null,
    braintree_result: null,
    customer: null,
    payment_cards: [],
    get_payment_cards_error: null,
    get_payment_cards_success: false,
    bt_token: null,
    get_bt_token_error: null,
    get_bt_token_loading: false,
    get_bt_token_success: false,
    cash_payment_loading: false,
    cash_payment_error: null,
    cash_payment_success: false,
    cash_payment: null,
    type: 'CASH',
};

export default (state = INITIAL_STATE, action) => {
    if (action.service && action.service === 'cash_payment') {
        switch (action.type) {
            case Types.PAYMENT_REQUEST:
                return {...state, make_payment_loading: true, make_payment_error: null, make_payment_success: false, type: 'CASH'};
            case Types.PAYMENT_SUCCESS:
                return {...state, make_payment_loading: false, make_payment_error: null, make_payment_success: true, cash_payment: action.response};
            case Types.PAYMENT_FAILURE:
                return {...state, make_payment_loading: false, make_payment_error: action.error, make_payment_success: false};
            default:
                return state;
        }
    }

    switch (action.type) {
        case Types.LOG_OUT_SUCCESS:
            return INITIAL_STATE;
        case Types.GET_BRAINTREE_CLIENT_TOKEN:
            return {...state, get_bt_token_loading: true, get_bt_token_error: null, get_bt_token_success: false};
        case Types.GET_BRAINTREE_CLIENT_TOKEN_FAILED:
            return {...state, get_bt_token_loading: false, get_bt_token_error: action.error, get_bt_token_success: false};
        case Types.GET_BRAINTREE_CLIENT_TOKEN_SUCCESS:
            return {...state, get_bt_token_loading: false, get_bt_token_error: null, get_bt_toke_success: true, bt_token: action.token};
        case Types.CREATE_CUSTOMER:
            return { ...state, create_customer_success: false, create_customer_error: null, create_customer_loading: true };
        case Types.CREATE_CUSTOMER_SUCCESS:
            return { ...state, create_customer_success: true, create_customer_error: null, customer: action.payload, create_customer_loading: false };
        case Types.CREATE_CUSTOMER_FAILED:
            return { ...state, create_customer_success: false, create_customer_error: action.payload, create_customer_loading: false  };
        case Types.MAKE_PAYMENT:
            return { ...state, make_payment_error: null, make_payment_success: false, make_payment_loading: true, charge: null, type: 'CARD' };
        case Types.MAKE_PAYMENT_FAILED:
            return { ...state, make_payment_error: action.payload, make_payment_success: false, make_payment_loading: false, charge: null };
        case Types.MAKE_PAYMENT_SUCCESS:
            return { ...state, make_payment_error: null, make_payment_success: true, make_payment_loading: false, charge: action.payload };
        case Types.GET_PAYMENT_CARDS:
            return { ...state, get_payment_cards_success: false, get_payment_cards_loading: true, get_payment_cards_error: null, payment_cards: null };
        case Types.GET_PAYMENT_CARDS_FAILED:
            return { ...state, get_payment_cards_success: false, get_payment_cards_loading: false, get_payment_cards_error: action.payload, payment_cards: [] };
        case Types.GET_PAYMENT_CARDS_SUCCESS:
            return { ...state, get_payment_cards_success: true, get_payment_cards_loading: false, get_payment_cards_error: null, payment_cards: action.payload };
        case Types.GET_SAVED_CUSTOMER_ID:
            return { ...state, customer: null };
        case Types.GET_SAVED_CUSTOMER_ID_FAILED:
            return { ...state, customer: null };
        case Types.GET_SAVED_CUSTOMER_ID_SUCCESS:
            return { ...state, customer: action.payload };
        case Types.MAKE_BRAINTREE_PAYMENT:
            return { ...state, make_payment_error: null, make_payment_success: false, make_payment_loading: true, braintree_result: null, type: 'PAYPAL' };
        case Types.MAKE_BRAINTREE_PAYMENT_FAILED:
            return { ...state, make_payment_error: action.payload, make_payment_success: false, make_payment_loading: false, braintree_result: null };
        case Types.MAKE_BRAINTREE_PAYMENT_SUCCESS:
            return { ...state, make_payment_error: null, make_payment_success: true, make_payment_loading: false, braintree_result: action.payload };
        case Types.CLEAR_CHECKOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};