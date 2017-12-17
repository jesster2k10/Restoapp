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
    container: {
        ...ApplicationStyles.screen.container,
        flexDirection: 'column',
    }
});