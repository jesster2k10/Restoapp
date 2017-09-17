import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    meals: [],
    loading: false,
    error: null,
    category_meals: [],
    category_meals_loading: false,
    category_meals_success: false,
    category_meals_error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_ALL_MEALS:
            return {...state, meals: [], loading: true, error: null};
        case Types.GET_ALL_MEALS_SUCCESS:
            return {...state, meals: action.payload, loading: false, error: null};
        case Types.GET_ALL_MEALS_FAILED:
            return {...state, meals: [], loading: false, error: action.payload};
        case Types.GET_CATEGORY_MEALS:
            return {...state, category_meals: [], category_meals_loading: true, category_meals_error: null};
        case Types.GET_CATEGORY_MEALS_SUCCESS:
            return {...state, category_meals: action.payload, category_meals_loading: false, category_meals_success: true, category_meals_error: null};
        case Types.GET_CATEGORY_MEALS_FAILED:
            return {...state, category_meals: [], category_meals_loading: false, category_meals_success: false, category_meals_error: action.payload};
        default:
            return state;
    }
};