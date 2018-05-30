/**
 * Created by jesseonolememen on 24/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import Constants from '../Config/Constants';
import strings from '../Config/Localization'
import {
    saveUserToken,
    removeUserToken,
    validateName,
} from '../Helpers';
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

export const addAddress = (token, id, address, name, email, phone) => (dispatch) => {
    console.log(address)
    dispatch({ type: Types.ADD_ADDRESS });

    axios.post(`${Constants.BASE_API_URL}/address`, { address, name, token, user: id, email, phone })
        .then(({ data }) => {
            if (data.results) {
                dispatch({ type: Types.ADD_ADDRESS_SUCCESS });
            } else {
                dispatch({ type: Types.ADD_ADDRESS_FAILED, payload: data.message })
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.ADD_ADDRESS_FAILED, payload: message });
        })
};

export const getAddresses = (token, id) => (dispatch) => {
    dispatch({ type: Types.GET_ADDRESSES });

    const options = {
        method: 'GET',
        url: `${Constants.BASE_API_URL}/addresses/user/${id}`,
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(options)
        .then(({ data }) => {
            if (data.success || data.results) {
                dispatch({ type: Types.GET_ADDRESSES_SUCCESS, payload: data.results });
            } else {
                dispatch({ type: Types.GET_ADDRESSES_FAILED, payload: data.error });
            }
        })
        .catch(({ message }) => {
            dispatch({ type: Types.GET_ADDRESSES_FAILED, payload: message });
        })
};

export const changePassword = (oldPassword, newPassword, token, id) => dispatch => {
    dispatch({ type: Types.CHANGE_USER_PASSWORD });

    axios.post(`${Constants.BASE_API_URL}/users/${id}/password/change`, { token, oldPassword, newPassword })
        .then(({ data }) => {
            if (data.success && data.token) {
                dispatch({ type: Types.CHANGE_USER_PASSWORD_SUCCESS, payload: data.token });
                removeUserToken();
                saveUserToken(data.token);
            } else {
                dispatch({ type: Types.CHANGE_USER_PASSWORD_FAILED, payload: data.message });
            }
        })
        .catch(error => {
            dispatch({ type: Types.CHANGE_USER_PASSWORD_FAILED, payload: error.message });
        })
};

export const updateUserName = (name) => {
    const key = 'PROFILE';
    
    if (validateName(name) && name.length > 0) {
        return { type: Types.CHANGE_NAME, name, key };
    } else {
        if (name.length < 1) {
            return { type: Types.CHANGE_NAME_FAILED, key, error: strings.formatString(strings.required, 'A name'), name}
        }

        if (!validateName(name)) {
            return { type: Types.CHANGE_NAME_FAILED, key, error: strings.invalidName, name }
        }
    }
}

export const updateUserProfile = imageData => dispatch => {
    dispatch({ type: Types.UPDATE_USER_PROFILE });

    const formData = new FormData();
    formData.append("file",  { uri: imageData, type: 'image/jpeg', name: 'user_profile.jpeg'});
    formData.append("upload_preset", Constants.CLOUDINARY.UPLOAD_PRESET);
    formData.append("api_key", Constants.CLOUDINARY.API_KEY);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    axios.post(`https://api.cloudinary.com/v1_1/${Constants.CLOUDINARY.NAME}/image/upload`, formData, {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'Content-type': 'multipart/form-data'
        },
    })
        .then(({ data }) => {
            if (data.error) {
                dispatch({ type: Types.UPDATE_USER_PROFILE_FAILED, error: data });
            } else {
                dispatch({ type: Types.UPDATE_USER_PROFILE_SUCCESS, profileImage: data });
                dispatch(updateUser())
            }
        })
        .catch(error => {
            dispatch({ type: Types.UPDATE_USER_PROFILE_FAILED, error: error.message });
        })

};

export const updateUser = () => (dispatch, getState) => {
    dispatch({ type: Types.UPDATE_USER });

    const { user, auth } = getState();
    const { token } = auth;
    const { currentUser } = user;

    if (currentUser != {}) {
        axios.patch(`${Constants.BASE_API_URL}/users/${currentUser._id}`, { ...currentUser, token })
            .then(({ data }) => {
                if (data.results) {
                    dispatch({ type: Types.UPDATE_USER_SUCCESS, user: data.results });
                } else {
                    dispatch({ type: Types.UPDATE_USER_FAILED, error: data.message || 'An unkown error happened' }); 
                }
            })
            .catch(error => {
                dispatch({ type: Types.UPDATE_USER_FAILED, error: error.message });
            })
    } else {
        dispatch({ type: Types.UPDATE_USER_FAILED, error: 'No changes to be made' });
    }
};