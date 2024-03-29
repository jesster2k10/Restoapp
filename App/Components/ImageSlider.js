import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Animated,
    PanResponder,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from './Styles/ImageSliderStyles';

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            height: Dimensions.get('window').width * (4 / 9),
            width: Dimensions.get('window').width,
            scrolling: false,
        };
    }

    _onRef(ref) {
        this._ref = ref;
        if (ref && this.state.position !== this._getPosition()) {
            this._move(this._getPosition());
        }
    }

    _move(index) {
        const isUpdating = index !== this._getPosition();
        const x = this.state.width * index;
        this._ref.scrollTo({x: this.state.width * index, y: 0, animated: true});
        this.setState({position: index});
        if (isUpdating && this.props.onPositionChanged) {
            this.props.onPositionChanged(index);
        }
    }

    _getPosition() {
        if (typeof this.props.position === 'number') {
            return this.props.position;
        }
        return this.state.position;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this._move(this.props.position);
        }
    }

    componentWillMount() {
        const width = this.state.width;

        let release = (e, gestureState) => {
            const width = this.state.width;
            const relativeDistance = gestureState.dx / width;
            const vx = gestureState.vx;
            let change = 0;

            if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            const position = this._getPosition();
            if (position === 0 && change === -1) {
                change = 0;
            } else if (position + change >= this.props.images.length) {
                change = (this.props.images.length) - (position + change);
            }
            this._move(position + change);
            return true;
        };

        this._panResponder = PanResponder.create({
            onPanResponderRelease: release
        });

        this._interval = setInterval(() => {
            const newWidth = Dimensions.get('window').width;
            if (newWidth !== this.state.width) {
                this.setState({width: newWidth});
            }
        }, 16);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const width = this.state.width;
        const height = this.props.height || this.state.height;
        const position = this._getPosition();

        return (<View>
            <ScrollView
                ref={ref => this._onRef(ref)}
                decelerationRate={0.99}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                {...this._panResponder.panHandlers}
                style={[styles.container, this.props.style, {height: height}]}>
                {this.props.images.map((image, index) => {
                    const imageObject = typeof image === 'string' ? {uri: image} : image;
                    const imageComponent = <Image
                        key={index}
                        source={imageObject}
                        style={[{height, width}]}
                    />;
                    if (this.props.onPress) {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{height, width}}
                                onPress={() => this.props.onPress({image, index})}
                                delayPressIn={200}
                            >
                                {imageComponent}
                            </TouchableOpacity>
                        );
                    } else {
                        return imageComponent;
                    }
                })}
            </ScrollView>
            <View style={[styles.buttons]}>
                {this.props.images.map((image, index) => {
                    return (<TouchableHighlight
                        key={index}
                        underlayColor="#ccc"
                        onPress={() => {
                            return this._move(index);
                        }}
                        style={[styles.button, this.props.indicatorStyle, {marginBottom: this.props.bottomSpacing}, position === index && [styles.buttonSelected, this.props.indicatorSelectedStyle ]]}>
                        <View></View>
                    </TouchableHighlight>);
                })}
            </View>
        </View>);
    }
}

export { ImageSlider };