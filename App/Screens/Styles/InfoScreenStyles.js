import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Fonts,
    Colours,
    Metrics
} from '../../Themes';
import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        padding: 0,
        marginTop: -10
    },
    bodyContainer: {
        flex: 1,
        padding: 0,
        margin: 0,
        backgroundColor: Colours.lightBody,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: -5,
        }
    },
    title: {
        ...Fonts.style.h6,
        color: Colours.mainTextColor,
        fontFamily: Fonts.type.medium,
        paddingBottom: 5,
    },
    body: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.base,
        fontSize: 12,
        color: Colours.mainTextColor,
        marginTop: 5
    },
    map: {
        width,
        height: 200
    },
    addressFirst: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.base,
        fontSize: 13,
        color: Colours.mainTextColor,
        marginTop: 5
    },
    address: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.base,
        fontSize: 13,
        color: Colours.mainTextColor,
        marginTop: 5
    },
    addressLast: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.base,
        fontSize: 13,
        color: Colours.mainTextColor,
        marginTop: 5
    },
});