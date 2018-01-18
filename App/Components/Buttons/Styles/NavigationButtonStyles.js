/**
 * Created by jesseonolememen on 12/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../../Themes/'

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
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        fontSize: 12,
        backgroundColor: 'transparent',
        marginRight: 2,
        color: 'white'
    }
});