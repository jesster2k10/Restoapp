/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../../Themes/'

export default StyleSheet.create({
    iconBackground: {
        backgroundColor: Colours.lightBody,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colours.darkBody,
        height: 50,
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...Fonts.style.normal,
        color: 'white',
        textAlign: 'center',
        fontSize: 15
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colours.darkBody,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
    },
    logo: {
        width: Metrics.images.logo,
        height: Metrics.images.logo,
    }
});