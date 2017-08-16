import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import Svg,{
    Path,
} from 'react-native-svg';
import {
    Colours
} from '../Themes';
import styles from './Styles/RibbonStyles';

const Ribbon = ({ soldOut, title }) => {
    return (
        <View style={styles.ribbonContainer}>
            <Text style={[styles.price, { color: soldOut ? Colours.soldOutRibbon.title : Colours.ribbon.title }]}>{ soldOut ? 'Sold Out' : title }</Text>
            <Svg width={soldOut ? 153 / 1.555 : 153 / 2} height={70} viewBox="0 20 200 20">
                <Path
                    fill-rule="evenodd"
                    fill={soldOut ? Colours.soldOutRibbon.background : Colours.ribbon.background}
                    d="M-0.001,-0.000 L220.999,-0.000 L220.999,70.000 L-0.001,70.000 C-0.001,70.000 14.444,52.500 14.444,35.000 C14.444,17.500 -0.001,-0.000 -0.001,-0.000 Z"
                    filter="url(#a)" />
            </Svg>
        </View>

    )
};

export { Ribbon };