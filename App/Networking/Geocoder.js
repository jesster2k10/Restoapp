/**
 * Created by jesseonolememen on 25/11/2017.
 */
import axios from 'axios';

const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';

export default class Geocoder {
    apiKey: null;

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    geocodeAddress = (address) => new Promise(async (resolve, reject) => {
        try {
            console.log(`${googleApiUrl}?address=${address.replace(' ', '+')}&key=${this.apiKey}`)
            let { data } = await axios.get(`${googleApiUrl}?address=${address.replace(' ', '+')}&key=${this.apiKey}`);

            if (!data.results || data.results.length == 0) {
                reject(new Error('Your address was not found or is invalid'));
            } else {
                resolve(data.results[0].geometry.location);
            }
        } catch (error) {
            reject(error);
        }
    });

    // async getFromLatLng(lat, lng) {
    //     if (!this.apiKey) {
    //         return Promise.reject(new Error("Provided API key is invalid"));
    //     }
    //
    //     if (!lat || !lng) {
    //         return Promise.reject(new Error("Provided coordinates are invalid"));
    //     }
    //
    //     const latLng = `${lat},${lng}`;
    //     const url = `${googleApiUrl}?key=${this.apiKey}&latlng=${encodeURI(latLng)}`;
    //
    //     return this.handleUrl(url);
    // },
    //
    // async getFromLocation(address) {
    //     if (!this.apiKey) {
    //         return Promise.reject(new Error("Provided API key is invalid"));
    //     }
    //
    //     if (!address) {
    //         return Promise.reject(new Error("Provided address is invalid"));
    //     }
    //
    //     const url = `${googleApiUrl}?key=${this.apiKey}&address=${encodeURI(address)}`;
    //
    //     return this.handleUrl(url);
    // },
    //
    // async handleUrl(url) {
    //     const response = await fetch(url).catch(
    //         error => {
    //             return Promise.reject(new Error("Error fetching data"));
    //         }
    //     );
    //
    //     const json = await response.json().catch(
    //         error => {
    //             return Promise.reject(new Error("Error parsing server response"));
    //         }
    //     );
    //
    //     if (json.status === 'OK') {
    //         return json;
    //     }
    //     else {
    //         return Promise.reject(new Error(`Server returned status code ${json.status}`));
    //     }
    // }
}