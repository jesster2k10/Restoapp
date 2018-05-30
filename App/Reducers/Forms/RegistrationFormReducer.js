import * as Types from '../../Config/ActionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = {
    email: '',
    password: '',
    name: '',
    errors: {}
};

export default (state = INITIAL_STATE, action) => {
    if (action.key === 'REGISTER' || action.key === 'ADDRESS') {
        switch (action.type) {
            case REHYDRATE:
                return {...state};
            case Types.CHANGE_EMAIL:
                return {...state, email: action.email, errors: {...state.errors, email: undefined}};
            case Types.CHANGE_EMAIL_FAILED:
                return {...state, email: action.email, errors: {...state.errors, email: action.error}};
            case Types.CHANGE_PASSWORD:
                return {...state, password: action.password, errors: {...state.errors, password: undefined}};
            case Types.CHANGE_PASSWORD_FAILED:
                return {...state, password: action.password, errors: {...state.errors, password: action.error}};
            case Types.CHANGE_NAME:
                return {...state, name: action.name, errors: {...state.errors, name: undefined}};
            case Types.CHANGE_NAME_FAILED:
                return {...state, name: action.name, errors: {...state.errors, name: action.error}};
            default:
                return state;
        }
    } else {
        return state;
    }
};