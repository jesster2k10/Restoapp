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
        backgroundColor: Colours.lighterBody
    },
    title: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 25,
    },
    body: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 25,
    },
    countryPicker: {
        height: 60
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.medium,
        color: Colours.mainTextColor,
        paddingTop: 10
    }
});