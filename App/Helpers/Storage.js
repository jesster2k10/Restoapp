/**
 * Created by jesseonolememen on 12/08/2017.
 */
import {
    AsyncStorage
} from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';

export const CART_KEY = 'cart';
export const TOKEN_KEY = 'token';

export const isUserLoggedIn = () => {
    return new Promise((resolve, reject) => {
        RNSecureKeyStore.get(TOKEN_KEY)
            .then(token => {
                if (token != null || token != undefined) {
                    resolve(token);
                } else {
                    reject(new Error('No token was found'));
                }
            })
            .catch(error => {
                reject(error);
            })
    });
};

export const saveUserToken = (token) => {
    RNSecureKeyStore.set(TOKEN_KEY, token)
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
};

export const removeUserToken = () => {
    return new Promise((resolve, reject) => {
        RNSecureKeyStore.remove(TOKEN_KEY)
            .then(() => {
                resolve();
            }, (err) => {
                reject(err);
            });
    })
};

export const cartExists = (callback) => {
    AsyncStorage.getItem(CART_KEY)
        .then((item) => {
            if (item) {
                callback(true, item);
            } else {
                callback(false, null)
            }
        })
        .catch(() => {
            callback(false, null);
        })
};

export const getCart = (callback) => {
    AsyncStorage.getItem(CART_KEY)
        .then(item => {
            if (item) {
                callback(item, null);
            } else {
                callback(null, null);
            }
        })
        .catch(err => {
            callback(null, err)
        })
};

export const saveCart = (cart, callback) => {
    AsyncStorage.setItem(CART_KEY, cart)
        .then(() => {
            if (callback) callback(true);
        })
        .catch(() => {
            if (callback) callback(false);
    })
};

export const clearCart = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem(CART_KEY)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })
};