/**
 * Created by jesseonolememen on 16/10/2017.
 */
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {
    Fonts,
    Metrics,
    Colours
} from '../../../Themes';

const { width, height } = Dimensions.get('window');
const size = (width / 2) - 20;

export default {
    container: {
        ...StyleSheet.absoluteFillObject,   // fill up all screen
        justifyContent: 'flex-end',         // align popup at the bottom
        backgroundColor: 'transparent',     // transparent background
    },
    // Semi-transparent background below popup
    backdrop: {
        ...StyleSheet.absoluteFillObject,   // fill up all screen
        backgroundColor: 'black',

    },
    options: {
        marginTop: 5,
        marginBottom: 5
    },
    // Popup
    modal: {
        backgroundColor: Colours.lighterBody,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: -2
        },
    },
    content: {
        flex: 1,
        margin: 20,
        marginBottom: 0,
    },
    // Movie container
    tablesContainer: {
        flex: 1,                            // take up all available space
        marginTop: 20,
        alignItems: 'center',
    },
    tableContainer: {
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
    },
    table: {
        flex: 1,
        height: 100
    },
    imageContainer: {
        flex: 1,                            // take up all available space
    },
    image: {
        borderRadius: 10,                   // rounded corners
        ...StyleSheet.absoluteFillObject,   // fill up all space in a container
    },
    movieInfo: {
        backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
    },
    title: {
        ...Fonts.style.h5,
        color: Colours.mainTextColor,
        fontWeight: '500',
        marginBottom: 10
    },
    genre: {
        color: '#BBBBBB',
        fontSize: 14,
    },
    sectionHeader: {
        ...Fonts.style.medium,
        color: Colours.mainTextColor,
        marginTop: 5,
        marginBottom: 5,
    },
    // Footer
    footer: {
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: Colours.accent,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 5
    },
    button: {
        fontFamily: Fonts.type.medium,
        fontSize: 15,
        color: Colours.mainTextColor
    },
}