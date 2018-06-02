/**
 * Created by jesseonolememen on 22/08/2017.
 */
import OAuthManager from 'react-native-oauth';
import config from '../Config/Auth/Auth';

const manager = new OAuthManager('Restaurant');
manager.configure(config);

const googleUrl = 'https://www.googleapis.com/plus/v1/people/me';

const getFacebookUserDetails = () => {
    return new Promise((resolve, reject) => {
        manager.makeRequest('facebook', '/me?fields=id,first_name,last_name,email')
            .then(({ data }) => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            });
    });
};

const getGoogleUserDetails = () => {
    return new Promise((resolve, reject) => {
        manager.makeRequest('google', googleUrl)
            .then(({ data }) => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
};

export const signInWithGoogle = (callback) => {
    manager.authorize('google', { scopes: 'profile+email' })
        .then(({ response }) => {
            getGoogleUserDetails()
                .then(details => {
                    let _details = [];
                    _details.push(details);
                    _details.push({ token: response.credentials.access_token });

                    callback(_details, null);
                })
                .catch(error => {
                    callback(null, error);
                })
            })
            .catch(err => {
                callback(null, err);
            });
};

export const signInWithFacebook = (callback) => {
    manager.authorize('facebook', {scopes: 'email, public_profile'})
        .then(({ response }) => {

            getFacebookUserDetails()
                .then(details => {
                    let _details = [];
                    _details.push(details);
                    _details.push({ token: response.credentials.access_token });

                    callback(_details, null);
                })
                .catch(err =>
                    callback(null, err)
                );

            })
            .catch(err => {
                callback(null, err)
            });
};
