/**
 * Created by jesseonolememen on 12/08/2017.
 */
import { StyleSheet, Platform } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../../Themes/'

const isAndroid = Platform.OS === 'android';

export default StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    icon: {
        color: Colours.mainTextColor
    },
    badgeContainer: {
        position: 'absolute',
        zIndex: 100,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    badge: {
        zIndex: 100,
        width: isAndroid ? 23: 20,
        height: isAndroid ? 23: 20,
        marginRight: isAndroid ? 10 : 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        fontSize: isAndroid ? 10 : 12,
        backgroundColor: 'transparent',
        marginRight: isAndroid ? 0 : 2,
        marginBottom: isAndroid ? 8 : 0,
        color: 'white'
    }
});