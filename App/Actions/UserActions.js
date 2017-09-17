/**
 * Created by jesseonolememen on 24/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const getCurrentUser = (token, id) => (dispatch) => {
    dispatch({ type: Types.GET_CURRENT_USER });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/users/${id}`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success === false) {
                dispatch({ type: Types.GET_CURRENT_USER_FAILED, payload: data.message });
            } else {
                dispatch({ type: Types.GET_CURRENT_USER_SUCCESS, payload: data.results });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_CURRENT_USER_FAILED, payload: message });
        })
};