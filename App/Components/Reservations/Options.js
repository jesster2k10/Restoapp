/**
 * Created by jesseonolememen on 16/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import Option from './Option';
import styles from './Styles/OptionStyles';

const { width } = Dimensions.get('window');
const optionWith = (width - 0) / 3 - 10;

export default class Options extends Component {

    static propTypes = {
        // Set of values to choose from
        values: PropTypes.array.isRequired,
        // Chosen value index
        chosen: PropTypes.number,
        // Gets called when user choses a value
        onChoose: PropTypes.func.isRequired,
    };

    render() {
        const { values, chosen, onChoose, style } = this.props;
        return (
            <View style={[styles.container, style ]}>
                <ScrollView
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    horizontal={true}
                    decelerationRate={0.1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                    snapToInterval={optionWith}
                    style={styles.options}
                >
                    {values.map((value, index) =>
                        <View style={[styles.optionContainer, { width: optionWith }]} key={index}>
                            <Option
                                value={value}
                                isChosen={index === chosen}
                                onChoose={() => onChoose(index)}
                            />
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }

}