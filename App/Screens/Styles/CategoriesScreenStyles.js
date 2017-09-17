/**
 * Created by jesseonolememen on 21/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        justifyContent: 'center',
        alignItems: 'center'
    }
});