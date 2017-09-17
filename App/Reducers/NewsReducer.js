import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    news: [],
    error: null,
    loading: false,
    success: false,
    categories: [],
    categories_error: null,
    categories_loading: false,
    categories_success: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_NEWS:
            return {...state, news: [], error: null, loading: true, success: false};

        case Types.GET_NEWS_SUCCESS:
            return {...state, news: action.news, error: null, loading: false, success: true};

        case Types.GET_NEWS_FAILED:
            return {...state, error: action.error, loading: false, success: false};

        case Types.GET_NEWS_CATEGORIES:
            return {...state, categories: [], categories_error: null, categories_loading: false, categories_success: false};

        default:
            return state;
    }
};