/**
 * Created by jesseonolememen on 03/09/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const favouriteMeal = (token, meal, user) => (dispatch) => {
    dispatch({ type: Types.FAVOURITE_MEAL });

    const options = {
        method: 'POST',
        url: `${Constants.BASE_API_URL}/meal-favourites`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true,
        data: {
            user,
            meal,
        }
    };

    console.log(options.data);

    axios(options)
        .then(({ data }) => {
            if (!data.results) {
                dispatch({ type: Types.FAVOURITE_MEAL_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.FAVOURITE_MEAL_SUCCESS, payload: data.results })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.FAVOURITE_MEAL_FAILED, payload: message })
        });
};

export const getFavouritesForUser = (token, user) => (dispatch) => {
    dispatch({ type: Types.GET_ALL_FAVOURITES });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/meal-favourites/user/${user}`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.GET_ALL_FAVOURITES_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.GET_ALL_FAVOURITES_SUCCESS, payload: data.results });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_ALL_FAVOURITES_FAILED, payload: message });
        })
};

export const removeFavourite = (token, favourite) => (dispatch) => {
    dispatch({ type: Types.REMOVE_FAVOURITE });

    const options = {
        method: 'DELETE',
        url: `${Constants.BASE_API_URL}/meal-favourites/${favourite}`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.REMOVE_FAVOURITE_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.REMOVE_FAVOURITE_SUCCESS  });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.REMOVE_FAVOURITE_FAILED, payload: message });
        })
};