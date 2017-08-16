/**
 * Created by jesseonolememen on 11/08/2017.
 */
import React from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Fonts,
    Metrics,
    Colours
} from '../../Themes';

export default StyleSheet.create({
    ribbonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    price: {
        ...Fonts.style.medium,
        position: 'absolute',
        zIndex: 10,
        color: Colours.ribbon.title,
        paddingTop: 4,
        paddingLeft: 2,
        paddingRight: Metrics.baseMargin - 2
    },
})