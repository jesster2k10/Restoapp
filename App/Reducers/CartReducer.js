import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    cart: {},
    cart_identifier: null,
    cart_error: null,
    cart_loading: false,
    added_to_cart: false,
    cart_saved_identifier: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_CART:
            return {...state, cart: {}, cart_loading: true, cart_error: null };

        case Types.GET_CART_FAILED:
            return {...state, cart: {}, cart_loading: false, cart_error: action.payload };

        case Types.GET_CART_SUCCESS:
            return {...state, cart: action.payload, cart_loading: false, cart_error: null };

        case Types.GET_SAVED_CART:
            return {...state, cart_saved_identifier: null };

        case Types.GET_SAVED_CART_FAILED:
            return {...state, cart_saved_identifier: null };

        case Types.GET_SAVED_CART_SUCCESS:
            return {...state, cart_saved_identifier: action.payload };

        case Types.ADD_MEAL_TO_CART:
            return {...state, cart_loading: true, cart_error: null, added_to_cart: false };

        case Types.ADD_MEAL_TO_CART_SUCCESS:
            return {...state, cart_loading: false, cart_error: null, added_to_cart: true };

        case Types.ADD_MEAL_TO_CART_FAILED:
            return {...state, cart_loading: false, cart_error: action.payload.message, added_to_cart: false };

        case Types.CREATE_CART:
            return {...state, cart: null, cart_identifier: null, cart_loading: true, cart_error: null};

        case Types.CREATE_CART_SUCCESS:
            return {...state, cart: action.payload, cart_identifier: action.payload._id, cart_loading: false, cart_error: null };

        case Types.CREATE_CART_FAILED:
            return {...state, cart: null, cart_identifier: null, cart_loading: false, cart_error: action.payload };

        case Types.RESET_CART:
            return {...state, cart: null, cart_identifier: null, cart_error: null, cart_loading: false };

        default:
            return state;
    }
};