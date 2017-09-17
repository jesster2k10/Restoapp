/**
 * Created by jesseonolememen on 25/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const getAllNews = (token) => (dispatch) => {
    dispatch({ type: Types.GET_NEWS });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/posts`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (!data.results || data.success === false) {
                dispatch({ type: Types.GET_NEWS_FAILED, error: data.message })
            } else {
                dispatch({ type: Types.GET_NEWS_SUCCESS, news: data.results });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_NEWS_FAILED, error: message })
        })
};

export const getCategories = (token) => {
    dispatch({ type: Types.GET_NEWS_CATEGORIES });

    axios.get(`${Constants.BASE_API_URL}/post-categories`, { token })
        .then(({ data }) => {
            if (!data.results || data.success === false) {
                dispatch({ type: Types.GET_NEWS_CATEGORIES_FAILED, error: data.message })
            } else {
                dispatch({ type: Types.GET_NEWS_CATEGORIES_SUCCESS, categories: data.results });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_NEWS_CATEGORIES_FAILED, error: message })
        })
};