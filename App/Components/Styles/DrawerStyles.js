/**
 * Created by jesseonolememen on 21/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts,
    Metrics
} from '../../Themes';

export default StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: Colours.darkBody
    },
    drawerContainer: {
        flex: 1,
        height: 40,
    },
    drawerItem: {
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.base,
        fontWeight: '300'
    },
    username: {
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.base,
        fontWeight: '500'
    },
    thumbnailContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    logoutButton: {
        padding: 0
    },
    logoutButtonText: {
        color: Colours.mainTextColor,
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        fontSize: 12,
        padding: 0
    }
});