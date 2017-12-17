/**
 * Created by jesseonolememen on 04/11/2017.
 */
import Database, { Endpoints } from './Database';

class API {
    getTokenHeader = (token) => ({ 'x-access-token': token });

    createOrder = (order, token) => new Promise(async (resolve, reject) => {
        let params = { ...order, token };

        try {
            let { results } = await Database.post(Endpoints.orders, null, null, params);
            resolve(results);
        } catch (error) {
            reject(error);
        }

    });
}

export default API;