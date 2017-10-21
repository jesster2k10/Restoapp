/**
 * Created by jesseonolememen on 16/10/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Fonts,
    Colours
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colours.lighterBody,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
    },
    text: {
        ...Fonts.style.normal,
        color: Colours.mainTextColor,
        fontSize: 14
    }
})