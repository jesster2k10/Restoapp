/**
 * Created by jesseonolememen on 09/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        paddingTop: 0,
        marginTop: 0
    }
});