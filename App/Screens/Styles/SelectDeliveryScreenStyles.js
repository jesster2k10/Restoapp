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
    row: {
        height: 60,
        backgroundColor: Colours.lighterBody,
        borderLeftWidth: 0,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)'
    },
});