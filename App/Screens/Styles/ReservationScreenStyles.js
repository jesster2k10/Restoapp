/**
 * Created by jesseonolememen on 14/10/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Fonts,
    Colours,
    Metrics
} from '../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        backgroundColor: Colours.lightBody,
        flex: 1,
    },
    header: {
        paddingTop: 30
    },
    inputContainers: {
        flexDirection: 'column'
    }
});