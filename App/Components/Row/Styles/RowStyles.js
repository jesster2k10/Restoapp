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
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    medium: {
        ...Fonts.style.medium,
        fontSize: normalize(13),
        color: Colours.mainTextColor
    },
    title: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 20,
    },
    bodyCol: {
        marginRight: 20,
    },
    body: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: normalize(13),
    },
    rowAlign: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
});