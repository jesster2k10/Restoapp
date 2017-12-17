/**
 * Created by jesseonolememen on 20/10/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts,
    Metrics,
    ApplicationStyles
} from '../../../Themes';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    container: {
        ...ApplicationStyles.screen.container,
        marginTop: 0,
        paddingTop: 0,
    },
    map: {
        width: Metrics.fullWidth,
        height: responsiveHeight(30),
    },
    heading: {
        color: Colours.mainTextColor,
        ...Fonts.style.h5,
        fontFamily: Fonts.type.medium
    },
    section: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        color: Colours.mainTextColor,
        fontSize: 13,
        fontFamily: Fonts.type.base,
        marginLeft: 25,
        marginRight: 25,
        textAlign: 'center',
    },
    arrivalTime: {
        color: Colours.mainTextColor,
        fontSize: 13,
        fontFamily: Fonts.type.medium
    },
    rowContainer: {
        width: Metrics.fullWidth,
        flex: 1,
        marginTop: 20
    },
    row: {
        backgroundColor: Colours.lighterBody,
        height: 60,
        marginBottom: 10
    }
});