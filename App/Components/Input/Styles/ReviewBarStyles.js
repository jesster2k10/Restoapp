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
        height: 140,
        backgroundColor: Colours.lighterBody,
        padding: 10
    },
    input: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        marginLeft: 5,
        marginBottom: 5,
        width: Dimensions.get('window').width - 60
    },
    titleInput: {
        ...Fonts.style.h5,
        fontWeight: '600',
        color: Colours.mainTextColor,
        marginLeft: 5,
        marginBottom: 5,
        width: Dimensions.get('window').width - 60
    },
    starContainer: {
        marginBottom: 10,
        marginLeft: 5,
    },
    col: {
        justifyContent: 'flex-end',
    },
    col2: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});