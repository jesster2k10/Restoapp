/**
 * Created by jesseonolememen on 11/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const clearMealErrors = () => ({ type: Types.CLEAR_MEAL_ERRORS });

export const getReviews = (token, { _id }) => (dispatch) => {
    dispatch({ type: Types.GET_REVIEWS });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/meal-reviews/${_id}/`,
        headers: {
            'x-access-token': token || Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.results) {
                dispatch({ type: Types.GET_REVIEWS_SUCCESS, payload: data.results });
            } else {
                dispatch({ type: Types.GET_REVIEWS_FAILED, payload: data.message });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_REVIEWS_FAILED, payload: message });
        })
};

export const getAllMeals = () => {
    return (dispatch) => {
        dispatch({ type: Types.GET_ALL_MEALS });

        axios.get(`${Constants.BASE_API_URL}/meals`)
            .then(({ data })=> {
                if (data.results) {
                    dispatch({ type: Types.GET_ALL_MEALS_SUCCESS, payload: data.results });
                } else {
                    dispatch({ type: Types.GET_ALL_MEALS_FAILED, payload: data.message });
                }
            })
            .catch(error => {
                dispatch({ type: Types.GET_ALL_MEALS_FAILED, payload: error.message });
            })
    }
};

export const getMealsForCategory = (category, token) => (dispatch) => {
    dispatch({ type: Types.GET_CATEGORY_MEALS });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/meal-categories/${category}/meals`,
        headers: {
            'x-access-token': token || Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.results) {
                dispatch({ type: Types.GET_CATEGORY_MEALS_SUCCESS, payload: data.results.meals });
            } else {
                dispatch({ type: Types.GET_ALL_MEALS_FAILED, payload: data.message });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_ALL_MEALS_FAILED, payload: message });
        })
};

export const addReview = ({ title, review, rating, created = new Date(), meal }, user, token) => (dispatch) => {
    dispatch({ type: Types.ADD_MEAL_REVIEW });

    axios.post(`${Constants.BASE_API_URL}/meal-reviews`, { title, review, rating, created, meal, user, token })
        .then(({ data }) => {
            if (data.results) {
                dispatch({ type: Types.ADD_MEAL_REVIEW_SUCCESS });
                dispatch(getReviews(token, meal));
            } else {
                dispatch({ type: Types.ADD_MEAL_REVIEW_FAILED, payload: data.message });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.ADD_MEAL_REVIEW_FAILED, payload: message });
        })

};