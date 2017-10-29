import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Colours,
    Metrics,
    Fonts
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colours.lighterBody,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.15)',
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowOffset: {
            width: 0,
            height: 2
        },
        marginBottom: 15
    },
    name: {
        ...Fonts.style.medium,
        color: Colours.mainTextColor
    },
    address: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});