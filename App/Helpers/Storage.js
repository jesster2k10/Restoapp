/**
 * Created by jesseonolememen on 12/08/2017.
 */
import {
    AsyncStorage
} from 'react-native';

export const CART_KEY = 'cart';

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

export const clearCart = (callback) => {
    AsyncStorage.removeItem(CART_KEY)
        .then(() => {
            callback(true, null)
        })
        .catch(error => {
            callback(false, error)
        })
};