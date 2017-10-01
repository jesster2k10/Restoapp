import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts,
    Metrics
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        height: 140,
        padding: 20,
        backgroundColor: Colours.lighterBody
    },
    input: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        height: 20,
        width: Metrics.fullWidth = 40
    },
    starContainer: {
        paddingBottom: 5
    }
});