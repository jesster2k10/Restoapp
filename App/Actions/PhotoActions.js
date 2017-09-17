/**
 * Created by jesseonolememen on 28/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const getAllPhotos = (token) => (dispatch) => {
    dispatch({ type: Types.GET_ALL_PHOTOS });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/photos`,
        headers: {
            'x-access-token': token || Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (!data.results) {
                dispatch({ type: Types.GET_ALL_PHOTOS_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.GET_ALL_PHOTOS_SUCCESS, payload: data.results })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_ALL_PHOTOS_FAILED, payload: message })
        })
};

export const getAllGalleries = (token) => (dispatch) => {
    dispatch({ type: Types.GET_ALL_GALLERIES });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/galleries`,
        headers: {
            'x-access-token': token || Constants.ACCESS_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (!data.results) {
                dispatch({ type: Types.GET_ALL_GALLERIES_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.GET_ALL_GALLERIES_SUCCESS, payload: data.results })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_ALL_GALLERIES_FAILED, payload: message })
        })
};