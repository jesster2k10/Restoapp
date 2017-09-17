import {
    StyleSheet
} from 'react-native';

import {
    ApplicationStyles,
    Fonts,
    Colours,
    Metrics
} from '../../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor
    },
    spinnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    }
});
