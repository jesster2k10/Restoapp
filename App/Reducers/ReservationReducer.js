/**
 * Created by jesseonolememen on 14/10/2017.
 */

import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    tables: []
};

export default (state = INITIAL_STATE, { payload, type }) => {
    switch (type) {
        case Types.GET_TABLES_SUCCESS:
            return {...state, tables: payload, error: null};
        default:
            return state;
    }
};