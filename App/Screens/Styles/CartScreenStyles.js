/**
 * Created by jesseonolememen on 12/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        justifyContent: 'flex-end',
        paddingTop: 0,
        paddingBottom: 100
    },
    cartOverlay: {
        backgroundColor: Colours.navigation.background,
        height: 100,
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
        zIndex: 100,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -3
        },
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    button: {
        backgroundColor: Colours.accent,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
    },
    buttonTitle: {
        fontFamily: Fonts.type.medium,
        fontSize: 15,
        color: Colours.mainTextColor
    },
    subtotalTitle: {
        fontFamily: Fonts.type.medium,
        fontSize: 14,
        color: Colours.mainTextColor
    },
    priceContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5
    }
});