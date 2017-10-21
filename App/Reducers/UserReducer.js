import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    currentUser: {
        name: {
            first: 'EMPTY_NAME',
            last: 'EMPTY_NAME'
        },
    },
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_CURRENT_USER:
            return {...state, loading: true, error: null};
        case Types.GET_CURRENT_USER_SUCCESS:
            return {...state, loading: false, currentUser: action.payload, error: null};
        case Types.GET_CURRENT_USER_FAILED:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};