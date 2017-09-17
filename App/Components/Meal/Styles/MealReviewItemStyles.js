import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Metrics,
    Fonts
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: Metrics.baseMargin,
        backgroundColor: Colours.darkBody,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.15,
    },
    body: {
        paddingLeft: Metrics.baseMargin,
        paddingRight: Metrics.baseMargin,
        paddingBottom: Metrics.baseMargin,
        paddingTop: Metrics.baseMargin
    },
    text: {
        color: Colours.mainTextColor,
        ...Fonts.style.normalSmall,
        fontSize: 12
    },
    smallText: {
        color: Colours.mainTextColor,
        ...Fonts.style.small,
        justifyContent: 'center',
        paddingRight: Metrics.baseMargin
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: Metrics.baseMargin
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 5,
    },
    end: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    title: {
        ...Fonts.style.h6,
        color: Colours.mainTextColor,
        paddingBottom: 5
    },
    star: {
        backgroundColor: Colours.ribbon.background
    },
    starContainer: {
        paddingBottom: 5
    }
});