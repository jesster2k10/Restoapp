/**
 * Created by jesseonolememen on 12/08/2017.
 */
import { StyleSheet } from 'react-native';
import {
    Fonts,
    Metrics,
    Colours
} from '../../../Themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: Metrics.baseMargin,
        backgroundColor: Colours.darkBody,
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.15
    },
    row: {
        flexDirection: 'column'
    },
    bodyContainer: {
        flex: 1,
        margin: 10,
    },
    image: {
        flex: 1,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
    },
    title: {
        ...Fonts.style.normal,
        color: Colours.mainTextColor,
        fontSize: 15
    },
    desc: {
        ...Fonts.style.small,
        color: Colours.mainTextColor
    },
    price: {
        ...Fonts.style.h5,
        fontFamily: Fonts.type.medium,
        color: Colours.mainTextColor,
    },
    count: {
        ...Fonts.style.small,
        color: Colours.mainTextColor,
        marginLeft: 5,
        marginTop: 5,
    },
    countContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'orange'
    },
    icon: {
        color: Colours.mainTextColor,
    }
});