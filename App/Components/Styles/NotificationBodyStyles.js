/**
 * Created by jesseonolememen on 12/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../Themes';

export default StyleSheet.create({
    ...Metrics.positioning,
    root: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    text: {
        ...Fonts.style.normalSmall,
        paddingBottom: 5,
        color: 'white'
    },
    bold: {
        ...Fonts.style.normalSmall,
        fontWeight: '500',
    },
    icon: {
        width: 10,
        height: 10,
        color: 'white',
    }
})