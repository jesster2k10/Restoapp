import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    meals: [],
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_ALL_MEALS:
            return {...state, meals: [], loading: true, error: null};
        case Types.GET_ALL_MEALS_SUCCESS:
            return {...state, meals: action.payload, loading: false, error: null};
        case Types.GET_ALL_MEALS_FAILED:
            return {...state, meals: [], loading: false, error: action.payload};
        default:
            return state;
    }
};