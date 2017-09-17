/**
 * Created by jesseonolememen on 19/08/2017.
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const {
    width: SCREEN_WIDTH,
} = Dimensions.get('window');

// based on iphone 5s's scale
export const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}