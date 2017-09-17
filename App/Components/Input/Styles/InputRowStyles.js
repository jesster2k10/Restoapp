/**
 * Created by jesseonolememen on 15/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Fonts,
    Colours,
    Metrics
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.lighterBody,
        alignItems: 'flex-start',
        padding: 15,
        borderLeftWidth: 0,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    label: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        color: Colours.superLightGray,
        marginLeft: -4,
        fontSize: 12
    },
    input: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        color: Colours.mainTextColor,
        width: Metrics.fullWidth - 40
    },
    phoneInput: {
        width: Metrics.fullWidth - 50
    },
    errorLabel: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        color: Colours.fire,
        marginLeft: -4,
        fontSize: 12
    },
    flag: {
        width: 50/2,
        height: 30/2,
        borderWidth: 0
    },
    pickerItem: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: 14
    },
    button: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.medium,
        color: Colours.mainTextColor,
        fontSize: 14
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'red',
    },
    iconContainer: {
        alignItems: 'flex-end'
    }
});