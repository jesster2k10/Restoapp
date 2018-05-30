/**
 * Created by jesseonolememen on 16/10/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Animated
} from 'react-native';
import styles from './Styles/ConfirmationStyles';

const { width, height } = Dimensions.get('window');

class Confirmation extends Component {
    static propTypes = {
        code: PropTypes.string,
        isOpen: PropTypes.bool,
        onClose: PropTypes.func
    };

    state = {
        visible: this.props.isOpen,
        position: new Animated.Value(this.props.isOpen ? 0 : height),
        opacity: new Animated.Value(0),
        height: height,
    };

    animateOpen = () => {
        // Update state first
        this.setState({ visible: true }, () => {
            Animated.parallel([
                Animated.timing(
                    this.state.opacity, { duration: 100, toValue: 1 } // semi-transparent
                ),
            ]).start();
        });
    };

    animateClose = () => {
        Animated.parallel([
            Animated.timing(
                this.state.opacity, { duration: 100, toValue: 0 } // transparent
            )
        ]).start(() => this.setState({
            visible: false,
        }));
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.animateOpen();
        }

        else if (this.props.isOpen && !nextProps.isOpen) {
            this.animateClose();
        }
    }

    render() {
        const { code, onClose } = this.props;

        if (!this.state.visible) {
            return null;
        }

        return (
            <Animated.View style={[ styles.container, { opacity: this.state.opacity } ]}>
                <Text style={styles.header}>Your confirmation code</Text>
                <Text style={styles.code}>{code}</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={onClose}
                >
                    <Text style={styles.button}>Done</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default Confirmation;