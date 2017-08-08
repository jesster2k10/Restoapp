/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        backgroundColor: Colours.sand
    },
    baseContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        paddingTop: Metrics.baseMargin,
        paddingLeft: Metrics.baseMargin,
        paddingRight: Metrics.baseMargin,
        paddingBottom: Metrics.baseMargin,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: Metrics.fullWidth,
        height: Metrics.fullHeight,
    },
    backgroundImage: {
        position: 'absolute',
        width: Metrics.fullWidth,
        height: Metrics.fullHeight,
        zIndex: 0,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
});