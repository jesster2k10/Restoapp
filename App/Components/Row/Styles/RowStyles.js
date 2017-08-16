/**
 * Created by jesseonolememen on 11/08/2017.
 */
import { StyleSheet } from 'react-native';
import {
    Colours,
    Fonts
} from '../../../Themes/';

export default StyleSheet.create({
    row: {
        height: 30,
        borderColor: 'lightgray',
    },
    end: {
        alignItems: 'flex-end',
    },
    medium: {
        ...Fonts.style.medium,
        fontSize: 13,
        color: Colours.mainTextColor
    },
    body: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: 13,
    }
});