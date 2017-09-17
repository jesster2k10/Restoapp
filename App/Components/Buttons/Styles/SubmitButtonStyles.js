/**
 * Created by jesseonolememen on 21/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../../Themes/'

export default StyleSheet.create({
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
});