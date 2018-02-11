/**
 * Created by jesseonolememen on 11/08/2017.
 */
import { StyleSheet } from 'react-native';
import {
    Colours,
    Fonts
} from '../../../Themes/';
import {
    normalize
} from '../../../Helpers';

export default StyleSheet.create({
    row: {
        height: 30+20,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    bigRow: {
        flex: 1,
        backgroundColor: Colours.lighterBody,
        alignItems: 'flex-start',
        borderColor: 'rgba(0,0,0,0.1)'
    },
    icon: {
        color: Colours.mainTextColor,
        paddingRight: 5
    },
    end: {
        height: '52%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    medium: {
        ...Fonts.style.medium,
        fontSize: normalize(13),
        color: Colours.mainTextColor
    },
    body: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: normalize(13),
    },
    rowAlign: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});