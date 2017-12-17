/**
 * Created by jesseonolememen on 04/11/2017.
 */
/**
 * Created by jesseonolememen on 30/10/2017.
 */
// @flow

import axios from 'axios';
import Constants from '../Config/Constants';

const GetTokenHeader = (token) => ({ 'x-access-token': token });

const Endpoints = {
    orders: '/orders',
    payments: {
        index: '/payments',
        braintree: '/payments/braintree',
        customer: {
            index: '/payments/customer',
            charge: '/payments/customer/charge',
            cards: '/payments/customer/cards'
        }
    },
};

class APIError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class Database {
    static Methods = {
        GET: 'get',
        POST: 'post',
    };

    static APIUrl = Constants.BASE_API_URL;

    /**
     * Calls a GET request
     * @param {Database.Endpoints} endpoint - The server endpoint
     * @param {Object} headers - Headers attached to the request
     * @returns {Promise}
     */

    static get = async (endpoint: string, headers: ?Object, params: ?Object) => new Promise(async (resolve, reject) => {
        const options = {
            method: Database.Methods.GET,
            baseURL: Database.APIUrl,
            url: endpoint,
            headers,
            params,
        };

        try {
            const response = await axios(options);

            if (response.success === false) {
                reject(response.error);
            } else {
                resolve(response.data);
            }

        } catch (error) {
            reject(error);
        }
    });

    /**
     * Calls a POST request
     * @param {Database.Endpoints} endpoint - The server endpoint
     * @param {Object} headers - Headers attached to the request
     * @param {Object} params - Parameters attached to the request
     * @param {Object} data - Data attached to the request
     * @returns {Promise}
     */

    static post = async (endpoint: string, headers: ?Object, params: ?Object, data: ?Object) => new Promise(async (resolve, reject) => {
        const options = {
            headers,
            params,
        };

        try {
            const response = await axios.post(`${Database.APIUrl}${endpoint}`, data, options);
            if (response.success === false) {
                reject(response.error);
            } else {
                resolve(response.data);
            }
        } catch (error) {
            reject(error);
        }
    });

    /**
     * Calls a PUT request
     * @param {Database.Endpoints} endpoint - The server endpoint
     * @param {Object} headers - Headers attached to the request
     * @param {Object} params - Parameters attached to the request
     * @param {Object} data - Data attached to the request
     * @returns {Promise}
     */

    static put = async (endpoint: string, headers: ?Object, params: ?Object, data: ?Object) => new Promise(async (resolve, reject) => {
        const options = {
            headers,
            params,
        };

        try {
            const response = await axios.put(`${Database.APIUrl}${endpoint}`, data, options);
            if (response.success === false) {
                reject(response.error);
            } else {
                resolve(response.data);
            }
        } catch (error) {
            reject(new APIError(error.message));
        }
    });


    /**
     * Calls a DELETE request
     * @param {Database.Endpoints} endpoint - The server endpoint
     * @param {Object} headers - Headers attached to the request
     * @param {Object} params - Parameters attached to the request
     * @param {Object} data - Data attached to the request
     * @returns {Promise}
     */

    static delete = async (endpoint: string, headers: ?Object, params: ?Object, data: ?Object) => new Promise((resolve, reject) => {
        const options = {
            headers,
            params,
        };

        try {
            const response = axios.delete(`${Database.APIUrl}${endpoint}`, data, options);
            if (response.success === false) {
                reject(response.error);
            } else {
                resolve(response.data);
            }
        } catch (error) {
            reject(new APIError(error.message));
        }
    });
}

export default Database;
export { Endpoints, GetTokenHeader };
