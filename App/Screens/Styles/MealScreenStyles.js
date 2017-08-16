/**
 * Created by jesseonolememen on 11/08/2017.
 */
import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colours, Fonts } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        marginTop: 0,
        paddingTop: 0,
        backgroundColor: Colours.darkBody
    },
    tabBarUnderline: {
        backgroundColor: Colours.lightBody
    },
    tab: {
        backgroundColor: Colours.navigation.background,
    },
    tabs: {
        backgroundColor: 'blue'
    },
    tabTitle: {
        color: Colours.mainTextColor,
        fontFamily: 'Poppins-Light'
    },
    activeTabTitle: {
        color: Colours.mainTextColor,
        fontFamily: 'Poppins-Medium',
        fontWeight: '500'
    },
});