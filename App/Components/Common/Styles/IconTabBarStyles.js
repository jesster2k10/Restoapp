/**
 * Created by jesseonolememen on 15/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Fonts,
    Colours,
} from '../../../Themes';

export default StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 100,
        flexDirection: 'row',
        paddingTop: 5,
        backgroundColor: Colours.navigation.background
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        ...Fonts.style.small,
        color: Colours.invertedTextColor,
    }
})