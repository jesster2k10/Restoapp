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

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colours.lighterBody
    },
    header: {
        ...Fonts.style.h6,
        color: '#fff',
        fontSize: 20,
    },
    code: {
        ...Fonts.style.normalSmall,
        color: 'white',
        fontSize: 36,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: Colours.accent,
        borderRadius: 100,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    button: {
        ...Fonts.style.medium,
        color: '#FFFFFF',
        fontSize: 14,
    },
});