/**
 * Created by jesseonolememen on 11/08/2017.
 */
import React from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts,
    Metrics,
    ApplicationStyles
} from '../../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        height: null,
        paddingTop: 0,
        flex: 1
    },
    imageSlider: {
        width: Metrics.fullWidth,
        flex: 1
    },
    indicator: {
        width: 15,
        height: 2.5,
    },
    image: {
        flex: 1,
        width: Metrics.fullWidth,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    titleContainer: {
        padding: Metrics.baseMargin,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'flex-end',
    },
    medium: {
        ...Fonts.style.medium,
        color: Colours.mainTextColor,
    },
    buttonTitle: {
        ...Fonts.style.medium,
        color: Colours.mainTextColor,
        fontSize: 13
    },
    end: {
        justifyContent: 'flex-end',
    },
    right: {
        alignItems: 'flex-end'
    },
    description: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: 13,
    },
    padding: {
        padding: Metrics.baseMargin
    },
    rowHeader: {
        ...Fonts.style.rowHeader,
        color: Colours.mainTextColor,
        paddingBottom: 5
    },
    button: {
        backgroundColor: Colours.darkBody,
        borderLeftColor: Colours.navigation.background,
        borderBottomColor: Colours.navigation.background,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    priceContainer: {
        flex: 1,
        position: 'absolute',
        width: Metrics.fullWidth,
        height: 200,
        alignItems: 'flex-end'
    },
});