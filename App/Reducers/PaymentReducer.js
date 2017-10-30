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
    get_payment_cards_success: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.CREATE_CUSTOMER:
            return { ...state, create_customer_success: false, create_customer_error: null, create_customer_loading: true };
        case Types.CREATE_CUSTOMER_SUCCESS:
            return { ...state, create_customer_success: true, create_customer_error: null, customer: action.payload, create_customer_loading: false };
        case Types.CREATE_CUSTOMER_FAILED:
            return { ...state, create_customer_success: false, create_customer_error: action.payload, create_customer_loading: false  };
        case Types.MAKE_PAYMENT:
            return { ...state, make_payment_error: null, make_payment_success: false, make_payment_loading: true, charge: null };
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
            return { ...state, make_payment_error: null, make_payment_success: false, make_payment_loading: true, braintree_result: null };
        case Types.MAKE_BRAINTREE_PAYMENT_FAILED:
            return { ...state, make_payment_error: action.payload, make_payment_success: false, make_payment_loading: false, braintree_result: null };
        case Types.MAKE_BRAINTREE_PAYMENT_SUCCESS:
            return { ...state, make_payment_error: null, make_payment_success: true, make_payment_loading: false, braintree_result: action.payload };
        default:
            return state;
    }
};