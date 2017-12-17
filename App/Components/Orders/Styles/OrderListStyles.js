import {
    StyleSheet
} from 'react-native';

import {
    ApplicationStyles,
    Fonts,
    Colours
} from '../../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        justifyContent: 'center',
        alignItems: 'center',

    },
    label: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor
    }
});