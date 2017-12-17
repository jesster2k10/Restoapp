import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Colours,
    Metrics,
    Fonts
} from '../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        margin: 0,
        padding: 0
    },
    rightImage: {
        width: (Metrics.fullWidth - 40) / 2,
        height: (Metrics.fullWidth - 20) / 2,
        marginRight: 10,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 5
        }
    },
    leftImage: {
        width: (Metrics.fullWidth - 20) / 2,
        height: (Metrics.fullWidth - 20) / 2,
        marginLeft: 10,
        marginRight: 5,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    headerImage: {
        width: (Metrics.fullWidth - 20),
        height: 150,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        marginBottom: 5,
    },
    headerImageContainer: {
        flex: 1,
        marginLeft: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.15,
        backgroundColor: Colours.darkBody,
        flexDirection: 'column',
        paddingBottom: 5,
    },
    headerTitle: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        backgroundColor: 'transparent',
        fontSize: 15,
        fontFamily: Fonts.type.medium
    },
    carouselContainer: {
        marginBottom: 20,
        flex: 1,
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    galleryTitle: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
    }
});