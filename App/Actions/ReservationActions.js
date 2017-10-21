/**
 * Created by jesseonolememen on 14/10/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import axios from 'axios';

export const getTables = () => ({
    type: Types.GET_TABLES_SUCCESS,
    payload: [
        {
            "id": 1,
            "name": "1",
            "seats": 10
        },
        {
            "id": 2,
            "name": "2",
            "seats": 10
        },
        {
            "id": 3,
            "name": "3",
            "seats": 8
        },
        {
            "id": 4,
            "name": "4",
            "seats": 5
        }
    ]
});