import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    meal: {},
    reviews: [],
    loading: false,
    error: null,
    add_review_loading: false,
    add_review_success: false,
    add_review_error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_REVIEWS:
            return {...state, loading: true, error: null};
        case Types.GET_REVIEWS_FAILED:
            return {...state, loading: false, error: action.payload};
        case Types.GET_REVIEWS_SUCCESS:
            return {...state, loading: false, error: null, reviews: action.payload};
        case Types.ADD_MEAL_REVIEW:
            return {...state, add_review_loading: true, add_review_success: false, add_review_error: null};
        case Types.ADD_MEAL_REVIEW_FAILED:
            return {...state, add_review_loading: false, add_review_success: false, add_review_error: action.payload};
        case Types.ADD_MEAL_REVIEW_SUCCESS:
            return {...state, add_review_loading: false, add_review_success: true, add_review_error: null};
        default:
            return state;
    }
};