import * as Types from '../../Config/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants';
import { omit } from 'lodash';

const INITIAL_STATE = {
    email: '',
    password: '',
    errors: {},
    valid: false
};

export default (state = INITIAL_STATE, action) => {
    if (action.key === 'LOGIN') {
        switch (action.type) {
            case REHYDRATE:
                return {...state};
            case Types.CHANGE_EMAIL:
                return {...state, email: action.email, errors: omit(state.errors, 'email')};
            case Types.CHANGE_EMAIL_FAILED:
                return {...state, email: action.email, errors: {...state.errors, email: action.error}};
            case Types.CHANGE_PASSWORD:
                return {...state, password: action.password, errors: omit(state.errors, 'password')};
            case Types.CHANGE_PASSWORD_FAILED:
                return {...state, password: action.password, errors: {...state.errors, password: action.error}};
            default:
                return state;
        }
    } else {
        return state
    }
};