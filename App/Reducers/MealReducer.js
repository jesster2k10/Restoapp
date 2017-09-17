import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    meal: {},
    reviews: [],
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_REVIEWS:
            return {...state, loading: true, error: null};
        case Types.GET_REVIEWS_FAILED:
            return {...state, loading: false, error: action.payload};
        case Types.GET_REVIEWS_SUCCESS:
            return {...state, loading: false, error: null, reviews: action.payload};
        default:
            return state;
    }
};