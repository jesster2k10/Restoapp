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
        marginTop: 0
    },
    image: {
        height: 200,
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        padding: Metrics.baseMargin,
        backgroundColor: Colours.lightBody
    },
    title: {
        ...Fonts.style.h6,
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.medium,
        paddingBottom: 5,
    },
    body: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.base,
        fontSize: 12,
        color: Colours.mainTextColor,
        marginTop: 5
    },
    authorName: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.base,
        color: Colours.mainTextColor
    },
    thumbnail: {
        width: 40,
        height: 40,
    }
});