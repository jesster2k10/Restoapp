import * as Types from '../Config/ActionTypes';

const INITIAL_STATE = {
    photos: [],
    error: null,
    success: false,
    loading: false,
    galleries: [],
    galleries_error: null,
    galleries_success: false,
    galleries_loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.GET_ALL_PHOTOS:
            return {...state, error: null, success: false, loading: true};
        case Types.GET_ALL_PHOTOS_FAILED:
            return {...state, error: action.payload, success: false, loading: false};
        case Types.GET_ALL_PHOTOS_SUCCESS:
            return {...state, error: null, photos: action.payload, success: true, loading: false};
        case Types.GET_ALL_GALLERIES:
            return {...state, galleries_error: null, galleries_success: false, galleries_loading: true};
        case Types.GET_ALL_GALLERIES_FAILED:
            return {...state, galleries_error: action.payload, galleries_success: false, galleries_loading: false};
        case Types.GET_ALL_GALLERIES_SUCCESS:
            return {...state, galleries_error: null, galleries: action.payload, galleries_success: true, galleries_loading: false};
        default:
            return state;
    }
};