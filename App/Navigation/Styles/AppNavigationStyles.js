/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { StyleSheet, View } from 'react-native'
import { Colours, Fonts } from '../../Themes/';

export default {
    headerStyle: {
        backgroundColor: Colours.navigation.background,
        borderColor: 'transparent'
    },
    headerTitleStyle: {
        ...Fonts.style.navigation,
        color: Colours.navigation.title,
    },
}
