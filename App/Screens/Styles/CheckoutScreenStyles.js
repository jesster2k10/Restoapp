/**
 * Created by jesseonolememen on 15/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        backgroundColor: Colours.lightBody,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    iconContainer: {
        paddingTop: 15,
        paddingBottom: 15
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab: {
        height: 80
    },
    button: {
        backgroundColor: Colours.accent,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
    },
    buttonTitle: {
        fontFamily: Fonts.type.medium,
        fontSize: 13,
        color: Colours.mainTextColor
    },
    buttonContainer: {
        justifyContent: 'flex-end',
    },
    cardInput: {
        ...Fonts.style.normalSmall,
        color: 'white'
    }

})