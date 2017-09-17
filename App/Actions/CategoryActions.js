/**
 * Created by jesseonolememen on 26/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const getCategories = (token) => (dispatch) => {
    dispatch({ type: Types.GET_CATEGORIES });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/meal-categories`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success === false || !data.results) {
                dispatch({ type: Types.GET_CATEGORIES_FAILED, error: data.message });
            } else {
                dispatch({ type: Types.GET_CATEGORIES_SUCCESS, categories: data.results });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_CATEGORIES_FAILED, error: message });
        })
};