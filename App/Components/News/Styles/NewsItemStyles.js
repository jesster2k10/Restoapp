import {
    StyleSheet
} from 'react-native';
import {
    Metrics,
    Colours,
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
        elevation: 3,
        shadowOpacity: 0.15,
    },
    image: {
        flex: 1,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        height: 100
    },
    bodyContainer: {
        flex: 1,
        margin: 10,
    },
    title: {
        ...Fonts.style.normal,
        color: Colours.mainTextColor,
        fontSize: 15
    },
    desc: {
        ...Fonts.style.small,
        color: Colours.mainTextColor
    },
    details: {
        ...Fonts.style.small,
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.base
    },
    row :{
        marginBottom: 5
    }
});