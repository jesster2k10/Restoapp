/**
 * Created by jesseonolememen on 16/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    LayoutAnimation,
    PanResponder,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    ScrollView
} from 'react-native';
import Table from './Table';
import Options from './Options';
import styles from './Styles/ReservationPopupStyles';

const { width, height } = Dimensions.get('window');
const DURATION = 200;
const defaultHeight = height * 0.77;

class ReservationPopup extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        table: PropTypes.object,
        days: PropTypes.array,
        times: PropTypes.array,
        seats: PropTypes.array,
        chosenDay: PropTypes.number,
        chosenSeats: PropTypes.number,
        chosenTime: PropTypes.number,
        onChooseDay: PropTypes.func,
        onChooseTime: PropTypes.func,
        onChooseSeats: PropTypes.func,
        onBook: PropTypes.func,
        onClose: PropTypes.func,
    };

    state = {
        position: new Animated.Value(this.props.isOpen ? 0 : height),
        opacity: new Animated.Value(0),
        height: defaultHeight,
        expanded: false,
        visible: this.props.isOpen,
    };

    _previousHeight = 0;

    componentWillMount() {
        // Initialize PanResponder to handle move gestures
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                // Ignore taps
                if (dx !== 0 && dy === 0) {
                    return true;
                }
                return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                // Store previous height before user changed it
                this._previousHeight = this.state.height;
            },
            onPanResponderMove: (evt, gestureState) => {
                // Pull delta and velocity values for y axis from gestureState
                const { dy, vy } = gestureState;
                // Subtract delta y from previous height to get new height
                let newHeight = this._previousHeight - dy;

                // Animate heigh change so it looks smooth
                LayoutAnimation.easeInEaseOut();

                // Switch to expanded mode if popup pulled up above 80% mark
                if (newHeight > height - height / 5) {
                    this.setState({ expanded: true });
                } else {
                    this.setState({ expanded: false });
                }

                // Expand to full height if pulled up rapidly
                if (vy < -0.75) {
                    this.setState({
                        expanded: true,
                        height: height
                    });
                }

                // Close if pulled down rapidly
                else if (vy > 0.75) {
                    this.props.onClose();
                }
                // Close if pulled below 75% mark of default height
                else if (newHeight < defaultHeight * 0.75) {
                    this.props.onClose();
                }
                // Limit max height to screen height
                else if (newHeight > (height-120)) {
                    this.setState({ height: height });
                }
                else {
                    this.setState({ height: newHeight });
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                const { dy } = gestureState;
                const newHeight = this._previousHeight - dy;

                // Close if pulled below default height
                if (newHeight < defaultHeight) {
                    this.props.onClose();
                }

                // Update previous height
                this._previousHeight = this.state.height;
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.animateOpen();
        }

        else if (this.props.isOpen && !nextProps.isOpen) {
            this.animateClose();
        }
    }

    animateOpen = () => {
        // Update state first
        this.setState({ visible: true }, () => {
            Animated.parallel([
                // Animate opacity
                Animated.timing(
                    this.state.opacity, { duration: DURATION, toValue: 0.5 } // semi-transparent
                ),
                // And slide up
                Animated.timing(
                    this.state.position, { duration: DURATION, toValue: 0 } // top of the screen
                ),
            ]).start();
        });
    };

    animateClose = () => {
        Animated.parallel([
            // Animate opacity
            Animated.timing(
                this.state.opacity, { duration: DURATION, toValue: 0 } // transparent
            ),
            // Slide down
            Animated.timing(
                this.state.position, { duration: DURATION, toValue: height } // bottom of the screen
            ),
        ]).start(() => this.setState({
            // Reset to default values
            height: defaultHeight,
            expanded: false,
            visible: false,
        }));
    };


    render() {
        const {
            table,
            days,
            times,
            seats,
            chosenDay,
            chosenTime,
            chosenSeats,
            onChooseDay,
            onChooseTime,
            onChooseSeats,
            onBook
        } = this.props;

        if (!this.state.visible) {
            return null;
        }

        return (
            <View style={styles.container}>
                {/* Closes popup if user taps on semi-transparent backdrop */}
                <TouchableWithoutFeedback onPress={this.props.onClose}>
                    <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[styles.modal, {
            // Animates height
            height: this.state.height,
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
                >
                    <ScrollView>
                    <View style={styles.tablesContainer}>
                        <Text style={styles.title}>Make a Reservation</Text>
                        <View style={[styles.tableContainer]}>
                            <Text style={styles.tableNumber}>{ table.name }</Text>
                        </View>
                    </View>

                    {/* Content */}
                    <View style={styles.content}
                    >

                        {/* Showtimes */}
                        <View>
                            {/* Day */}
                            <Text style={styles.sectionHeader}>Day</Text>
                            {/* TODO: Add day options here */}
                            <Options
                                style={styles.options}
                                values={days}
                                chosen={chosenDay}
                                onChoose={onChooseDay}
                            />
                            {/* Time */}
                            <Text style={styles.sectionHeader}>Time</Text>
                            {/* TODO: Add show time options here */}
                            <Options
                                style={styles.options}
                                values={times}
                                chosen={chosenTime}
                                onChoose={onChooseTime}
                            />
                            {/* Seats */}
                            <Text style={styles.sectionHeader}>Seats</Text>
                            {/* TODO: Add show time options here */}
                            <Options
                                style={styles.options}
                                values={seats}
                                chosen={chosenSeats}
                                onChoose={onChooseSeats}
                            />
                        </View>

                    </View>
                    </ScrollView>


                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableHighlight
                            underlayColor="#9575CD"
                            style={styles.buttonContainer}
                            onPress={onBook}
                        >
                            <Text style={styles.button}>Book my Table</Text>
                        </TouchableHighlight>
                    </View>
                </Animated.View>
            </View>
        );
    }

}

export default ReservationPopup;