/**
 * Created by jesseonolememen on 21/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Metrics,
    Fonts,
    Colours
} from '../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        paddingTop: 0,
    },
    textContainer: {
        margin: Metrics.baseMargin
    },
    terms: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.thin,
        fontSize: 12,
    },
    toast: {
        backgroundColor: Colours.navigation.background,
        marginLeft: 20,
        marginRight: 20
    },
    toastText: {
        color: Colours.mainTextColor,
        ...Fonts.style.normalSmall,
        fontSize: 13,
    }
});