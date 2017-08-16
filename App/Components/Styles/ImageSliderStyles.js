/**
 * Created by jesseonolememen on 11/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    buttons: {
        height: 15,
        marginTop: -15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        margin: 3,
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        backgroundColor: '#ccc',
        opacity: 0.9
    },
    buttonSelected: {
        opacity: 1,
        backgroundColor: '#fff',
    }
});