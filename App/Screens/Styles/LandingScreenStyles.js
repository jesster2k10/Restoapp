/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width,
        height,
        backgroundColor: Colours.sand
    },
    topContainer: {
        flex: 1,
        position: 'absolute',
        padding: Metrics.baseMargin,
        width,
        height,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'absolute',
        padding: Metrics.baseMargin,
        width,
    },
    buttonContainer: {
        paddingBottom: 10
    },
    backgroundImage: {
        position: 'absolute',
        width,
        height,
        zIndex: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    turquoiseButton: {
        borderRadius: 0,
        borderColor: Colours.turquoise
    },
    turquoiseButtonIcon: {
        marginBottom: 1
    },
    turquoiseButtonTitle: {
        ...Fonts.style.normal,
        color: Colours.turquoise,
        marginLeft: 7,
        fontSize: 16,
        marginTop: 2
    },
    center: {
        ...Metrics.center,
        flexDirection: 'row'
    },
    textButton: {
        ...Fonts.style.normal,
        color: Colours.mainTextColor,
        textAlign: 'center',
        fontSize: 16
    },
    padding: {
        paddingTop: 30,
        paddingBottom: 40
    },
    logo: {
        width: Metrics.images.logo/1.5,
        height: Metrics.images.logo/1.5,
    },
    title: {
        ...Fonts.style.h1,
        backgroundColor: 'transparent',
        flex: 1,
        fontSize: 30,
        color: Colours.mainTextColor,
        textAlign: 'center',
    }
});