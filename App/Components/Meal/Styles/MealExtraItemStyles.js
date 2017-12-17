
import { StyleSheet } from 'react-native';
import {
    Colours,
    Fonts
} from '../../../Themes/';
import {
    normalize
} from '../../../Helpers';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.lighterBody,
        alignItems: 'flex-start',
        padding: 15,
        borderLeftWidth: 0,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    icon: {
        color: Colours.mainTextColor,
        paddingRight: 5
    },
    end: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    medium: {
        ...Fonts.style.medium,
        fontSize: normalize(15),
        color: Colours.mainTextColor
    },
    body: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: normalize(13),
        paddingTop: 5,
    },
    rowAlign: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});