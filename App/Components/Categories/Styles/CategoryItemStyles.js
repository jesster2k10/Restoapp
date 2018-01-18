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
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
        width: (Metrics.fullWidth / 2) - 20,
        borderRadius: 2,
        margin: Metrics.baseMargin,
        backgroundColor: Colours.darkBody,
    },
    image: {
        flex: 1,
        width: null,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        height: 100,
    },
    name: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.medium
    },
    excerpt: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.base,
        fontSize: 12
    }
});