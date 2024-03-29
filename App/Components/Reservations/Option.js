/**
 * Created by jesseonolememen on 16/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    Colours
} from '../../Themes';
import styles from './Styles/OptionStyles';

// Colors for smooth transition when user chosess an option
const colorDefault = Colours.clear,  // white
    colorSelected = Colours.darkBody;        // purple

export default class Options extends Component {

    static propTypes = {
        // Value to display
        value: PropTypes.string.isRequired,
        // Wheter this values was chosen by user or not
        isChosen: PropTypes.bool.isRequired,
        // Gets called when user choses this value
        onChoose: PropTypes.func.isRequired,
    };

    state = {
        // Animate background color change when value gets chosen
        background: new Animated.Value(0)
    }

    // Animate option selection if value was already chosen not by a user
    componentWillMount() {
        if (this.props.isChosen) {
            this.animateSelect();
        }
    }

    // Handle isChosen prop changes
    componentWillReceiveProps(nextProps) {
        if (!this.props.isChosen && nextProps.isChosen) {
            this.animateSelect();
        } else if (this.props.isChosen && !nextProps.isChosen) {
            this.animateDeselect();
        }
    }

    animateSelect() {
        Animated.timing(this.state.background, {
            toValue: 100,
            duration: 200,
        }).start();
    }

    animateDeselect() {
        Animated.timing(this.state.background, {
            toValue: 0,
            duration: 200,
        }).start();
    }

    render() {
        const { value, isChosen, onChoose } = this.props;
        const backgroundColorAnimation = this.state.background.interpolate({
            inputRange: [0, 100],
            outputRange: [colorDefault, colorSelected],
        });
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onChoose}
            >
                <Animated.View
                    style={[styles.container, { borderColor: isChosen ? colorSelected : 'white', backgroundColor: backgroundColorAnimation }]}
                >
                    <Text style={styles.text}>
                        {value}
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }

}