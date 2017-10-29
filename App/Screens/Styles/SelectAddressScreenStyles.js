import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Colours,
    Metrics,
    Fonts
} from '../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor
    }
});