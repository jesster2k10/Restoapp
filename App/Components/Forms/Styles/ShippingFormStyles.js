/**
 * Created by jesseonolememen on 15/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Fonts,
    Colours,
    ApplicationStyles
} from '../../../Themes';

export const countryPickerStyles = {
    modalContainer: {
        flex: 1,
    },
    countryName: {
        fontFamily: Fonts.type.base,
        color: 'black'
    },
};

export default StyleSheet.create({
    header: {
        ...Fonts.style.small,
        color: Colours.mainTextColor
    },
    rowContainer: {
        flex: 1,
    },
    row: {
        height: 60,
        padding: 20,
        backgroundColor: Colours.lighterBody
    },
    countryPicker: {
        height: 60
    }
});