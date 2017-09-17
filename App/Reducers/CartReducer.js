import * as Types from '../Config/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {
    cart: {},
    cart_identifier: null,
    cart_error: null,
    cart_loading: false,
    added_to_cart: false,
    cart_saved_identifier: null,
    remove_meal_from_cart_success: false,
    remove_meal_from_cart_error: null,
    remove_meal_from_cart_loading: false,
    cart_reset_error: null,
    cart_reset_loading: false,
    cart_reset_success: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            let incoming = action.payload.cart;

            if (incoming) {
                return {...state, ...incoming, cart_loading: false, cart_error: null, added_to_cart: false}
            }
            return state;

        case Types.GET_CART:
            return {...state, cart_loading: true, cart_error: null };

        case Types.GET_CART_FAILED:
            return {...state, art_loading: false, cart_error: action.payload };

        case Types.GET_CART_SUCCESS:
            return {...state, cart: action.payload, cart_loading: false, cart_error: null };

        case Types.GET_SAVED_CART:
            return {...state, cart_saved_identifier: null };

        case Types.GET_SAVED_CART_FAILED:
            return {...state, cart_saved_identifier: null };

        case Types.GET_SAVED_CART_SUCCESS:
            return {...state, cart_saved_identifier: action.payload };

        case Types.ADD_MEAL_TO_CART:
            return {...state, cart_add_loading: true, cart_error: null, added_to_cart: false };

        case Types.ADD_MEAL_TO_CART_SUCCESS:
            return {...state, cart_add_loading: false, cart_error: null, added_to_cart: true };

        case Types.ADD_MEAL_TO_CART_FAILED:
            return {...state, cart_add_loading: false, cart_error: action.payload.message, added_to_cart: false };

        case Types.CREATE_CART:
            return {...state, cart: null, cart_identifier: null, cart_loading: true, cart_error: null};

        case Types.CREATE_CART_SUCCESS:
            return {...state, cart: action.payload, cart_identifier: action.payload._id, cart_loading: false, cart_error: null };

        case Types.CREATE_CART_FAILED:
            return {...state, cart_identifier: null, cart_loading: false, cart_error: action.payload };

        case Types.RESET_CART:
            return {...state, cart_reset_error: null, cart_reset_loading: true, cart_reset_success: false };

        case Types.RESET_CART_FAILED:
            return {...state, cart_reset_error: action.payload, cart_reset_loading: false, cart_reset_success: false};

        case Types.RESET_CART_SUCCESS:
            return {...state, cart_reset_error: null, cart_reset_loading: false, cart_reset_success: true, cart_saved_identifier: null};

        case Types.REMOVE_MEAL_FROM_CART:
            return {...state, remove_meal_from_cart_success: false, remove_meal_from_cart_error: null, remove_meal_from_cart_loading: true};

        case Types.REMOVE_MEAL_FROM_CART_SUCCESS:
            return {...state, remove_meal_from_cart_success: true, remove_meal_from_cart_error: null, remove_meal_from_cart_loading: false};

        case Types.REMOVE_MEAL_FROM_CART_FAILED:
            return {...state, remove_meal_from_cart_success: false, remove_meal_from_cart_error: action.payload, remove_meal_from_cart_loading: false};

        case Types.CLEAR_REMOVE_ERRORS:
            return {...state, remove_meal_from_cart_success: false, remove_meal_from_cart_error: null, remove_meal_from_cart_loading: false};

        case Types.CLEAR_ADD_ERRORS:
            return {...state, cart_add_loading: false, cart_error: null, added_to_cart: false };

        case Types.CLEAR_RESET_ERRORS:
            return {...state, cart_reset_error: null, cart_reset_loading: false, cart_reset_success: false};

        case Types.CLEAR_MEAL_ERRORS:
            return {...state, cart_error: null, added_to_cart: false };

        default:
            return state;
    }
};