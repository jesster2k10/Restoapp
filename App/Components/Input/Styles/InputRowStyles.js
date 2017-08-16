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
        width: Metrics.fullWidth - 30,
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        color: Colours.mainTextColor,
    },
});