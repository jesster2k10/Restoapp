/**
 * Created by jesseonolememen on 10/08/2017.
 */
import { StyleSheet } from 'react-native';
import {
    Metrics,
    Colours,
    Fonts
} from '../../Themes/';
import {
    isiPhoneX
} from '../../Helpers'

const HEIGHT = isiPhoneX() ? 220 : 175;

export default StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: Colours.darkBody
    },
    image: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    price: {
        ...Fonts.style.medium,
        position: 'absolute',
        zIndex: 10,
        color: Colours.alternative,
        backgroundColor: 'transparent',
        paddingTop: 4,
        paddingLeft: 2,
    },
    priceContainer: {
        flex: 1,
        position: 'absolute',
        width: Metrics.fullWidth,
        height: HEIGHT,
        alignItems: 'flex-end'
    },
    ribbonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        padding: Metrics.baseMargin,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: Metrics.baseMargin + 35,
        left: 0,
        flex: 1,
        justifyContent: 'flex-end',
    },
    medium: {
        ...Fonts.style.medium,
        color: 'white',
    },
    small: {
        ...Fonts.style.small,
        color: 'white',
    },
});