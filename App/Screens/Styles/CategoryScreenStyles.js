import {
    StyleSheet
} from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/'


export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        paddingTop: 0,
        marginTop: 0
    }
});