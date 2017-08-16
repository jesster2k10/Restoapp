/**
 * Created by jesseonolememen on 07/08/2017.
 */
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES,
    GET_CATEGORY_MEALS,
    GET_CATEGORY_MEALS_SUCCESS,
    GET_CATEGORY_MEALS_FAILED
} from '../Config/ActionTypes';

const INITIAL_STATE = {
    categories: {},
    category_meals: {},
    error: '',
    loading: false,
    loading_meals: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload.results, loading: false};
        case GET_CATEGORIES_FAILED:
            return {...state, error: action.payload, loading: false };
        case GET_CATEGORIES:
            return {...state, loading: true, error: ''};
        case GET_CATEGORY_MEALS:
            return {...state, loading_meals: true, error: ''};
        case GET_CATEGORY_MEALS_SUCCESS:
            return {...state, loading_meals: false, error: '', category_meals: action.payload.results.meals };
        case GET_CATEGORY_MEALS_FAILED:
            return {...state, loading_meals: false, error: action.payload };
        default:
            return state;
    }
};