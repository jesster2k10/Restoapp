import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    favourites: [],
    loading: false,
    success: false,
    error: null,
    delete_loading: false,
    delete_success: false,
    delete_error: null,
    get_loading: false,
    get_success: false,
    get_error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FAVOURITE_MEAL:
            return {...state, loading: true, error: null, success: false};

        case Types.FAVOURITE_MEAL_FAILED:
            return {...state, loading: false, error: action.payload, success: false};

        case Types.FAVOURITE_MEAL_SUCCESS:
            return {...state, loading: false, error: null, success: true};

        case Types.GET_ALL_FAVOURITES:
            return {...state, get_loading: true, get_error: null, get_success: false};

        case Types.GET_ALL_FAVOURITES_FAILED:
            return {...state, get_loading: false, get_error: action.payload, get_success: false};

        case Types.GET_ALL_FAVOURITES_SUCCESS:
            return {...state, get_loading: false, get_error: null, get_success: false, favourites: action.payload};

        case Types.CLEAR_MEAL_ERRORS:
            return {...state, error: null, success: false };

        case Types.LOG_OUT_SUCCESS:
            return INITIAL_STATE;

        default:
            return state;
    }
};