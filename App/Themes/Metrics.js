/**
 * Created by jesseonolememen on 07/08/2017.
 */
import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
    marginHorizontal: 10,
    marginVertical: 10,
    section: 25,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    doubleSection: 50,
    horizontalLineHeight: 1,
    searchBarHeight: 30,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    buttonRadius: 4,
    fullWidth: Dimensions.get('window').width,
    fullHeight: height,
    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 50
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    positioning: {
        alignStart: {
            alignItems: 'flex-start'
        },
        alignEnd: {
            alignItems: 'flex-end'
        }
    }
};

export default metrics
