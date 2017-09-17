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
    image: {
        height: Metrics.fullHeight,
        width: Metrics.fullWidth,
        flex: 1,
    }
});