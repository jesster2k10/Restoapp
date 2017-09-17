import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    categories: [],
    success: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_CATEGORIES:
            return {...state, loading: true, success: false, error: null};

        case Types.GET_CATEGORIES_FAILED:
            return {...state, loading: false, success: false, error: action.error};

        case Types.GET_CATEGORIES_SUCCESS:
            return {...state, loading: false, success: true, error: null, categories: action.categories};

        default:
            return state;
    }
};