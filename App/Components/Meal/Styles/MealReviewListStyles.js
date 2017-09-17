import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Fonts,
    Colours
} from '../../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 45
    },
    label: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor
    },
    button: {
        paddingTop: 15
    }

});