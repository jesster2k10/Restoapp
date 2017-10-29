import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';

let defaultTint = 'rgba(0,0,0,0.1)';

const INITIAL_STATE = {
    payment_type: Constants.PAYMENT_TYPES.CREDIT_CARD,
    page: 0,
    expiry_tint_color: defaultTint,
    card_number_tint_color: defaultTint,
    ccv_tint_color: defaultTint,
    can_confirm_payment: false,
    can_confirm_shipping: false,
    billing_address: {},
    selected_address: {},
    select_address_done: false,
};

export default (state = INITIAL_STATE, { payload, type }) => {
    switch (type) {
        case Types.CHECKOUT_CHANGE_PAGE:
            return { ...state, page: payload };
        case Types.SET_SELECTED_PAYMENT_TYPE:
            return { ...state, payment_type: payload} ;
        case Types.SET_CARD_NUMBER_TINT_COLOR:
            return { ...state, card_number_tint_color: payload} ;
        case Types.SET_CCV_TINT_COLOR:
            return { ...state, ccv_tint_color: payload} ;
        case Types.SET_EXPIRY_TINT_COLOR:
            return { ...state, expiry_tint_color: payload} ;
        case Types.CONFIRM_PAYMENT:
            return { ...state, can_confirm_payment: payload };
        case Types.CONFIRM_SHIPPING:
            return { ...state, can_confirm_shipping: payload };
        case Types.MAKE_PAYMENT_SUCCESS:
            return { ...state, can_confirm_payment: true };
        case Types.MAKE_PAYMENT:
            return { ...state, can_confirm_payment: false };
        case Types.MAKE_PAYMENT_FAILED:
            return { ...state, can_confirm_payment: false };
        case Types.CHARGE_CUSTOMER:
            return { ...state, can_confirm_payment: false };
        case Types.CHARGE_CUSTOMER_SUCCESS:
            return { ...state, can_confirm_payment: true };
        case Types.CHARGE_CUSTOMER_FAILED:
            return { ...state, can_confirm_payment: false };
        case Types.RESET_SELECT_ADDRESS_DONE:
            return {...state, select_address_done: false};
        case Types.SELECT_ADDRESS:
            return {...state, selected_address: payload, select_address_done: true};
        default:
            return state;
    }
};