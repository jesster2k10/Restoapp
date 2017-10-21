/**
 * Created by jesseonolememen on 16/10/2017.
 */
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Colours,
    Fonts,
    Metrics
} from '../../../Themes';

const { width } = Dimensions.get('window');
const size = (width / 2) - 20;

export default StyleSheet.create({
    container: {
        width: size,
        height: size,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        borderRadius: 2000,
        margin: Metrics.baseMargin,
        backgroundColor: Colours.darkBody,
        padding: Metrics.baseMargin,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableNumber: {
        ...Fonts.style.h1,
        color: Colours.mainTextColor
    }
})