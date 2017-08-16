/**
 * Created by jesseonolememen on 11/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const getAllMeals = () => {
    return (dispatch) => {
        dispatch({ type: Types.GET_ALL_MEALS });

        axios.get(`${Constants.BASE_API_URL}/meals`)
            .then(({ data })=> {
                if (data.results) {
                    dispatch({ type: Types.GET_ALL_MEALS_SUCCESS, payload: data.results });
                } else {
                    dispatch({ type: Types.GET_ALL_MEALS_FAILED });
                }
            })
            .catch(error => {
                dispatch({ type: Types.GET_ALL_MEALS_FAILED, payload: error.message });
            })
    }
};