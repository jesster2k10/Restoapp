import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts
} from '../../../Themes';

export default StyleSheet.create({
    text: {
        color: Colours.mainTextColor,
        ...Fonts.style.normalSmall,
        fontSize: 14,
        padding: 0
    }
});