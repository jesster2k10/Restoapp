/**
 * Created by jesseonolememen on 15/08/2017.
 */

import { StyleSheet } from 'react-native';
import {
    Fonts,
    Colours
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        ...Fonts.style.medium,
        color: Colours.mainTextColor,
        fontSize: Fonts.size.normalSmall,
    }
});