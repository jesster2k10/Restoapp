/**
 * Created by jesseonolememen on 01/10/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import {
    Text,
} from 'native-base';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    Colours
} from '../../Themes';
import * as Animatable from 'react-native-animatable';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/ReviewBarStyles';
import Constants from '../../Config/Constants';

class ReviewBar extends Component {
    constructor() {
        super();

        this.state = {
            focused: false,
            body: null,
            title: null,
            rating: null,
            height: null
        }
    }

    componentDidMount() {
        window.EventBus.on(Constants.EVENTS.ADDED_REVIEW, this.addedReview.bind(this));
    }

    addedReview() {
        this.setState({
            focused: false,
            body: null,
            title: null,
            rating: null,
            height: null
        })
    }

    focus() {
        this.setState({ focused: true });
    }

    blur() {
        this.setState({ focused: !!(this.state.body || this.state.title) });
    }

    renderButton() {
        const { loading } = this.props;
        const { onSubmit, meal } = this.props;
        const { body, title, rating } = this.state;

        if (loading) {
            return (
                <Spinner size={15} type='Arc' color='white' />
            )
        } else {
            return (
                <TouchableOpacity onPress={() => onSubmit({ title, review: body, rating: rating || 0, created: new Date(), meal })}>
                    <Icon name="ios-done-all-outline" size={30} color="#fff" />
                </TouchableOpacity>
            )
        }
    }

    render() {
        const { focused, body, title, rating, height } = this.state;

        let _rating = focused && body ? <StarRating
                halfStarEnabled
                iconSet="Ionicons"
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                halfStar="ios-star-half"
                emptyStarColor={Colours.yellow}
                starColor={Colours.yellow}
                starSize={25}
                maxStars={5}
                rating={rating}
                space={false}
                starPadding={5}
                disabled={false}
                selectedStar={(rating) => this.setState({ rating })}
                containerStyle={styles.starContainer}
            /> : null;

         let _title = focused && body ? <TextInput
                 ref={input => this.input = input}
                 style={styles.titleInput}
                 placeholder="Review Title (Optional)"
                 value={title}
                 underlineColorAndroid='rgba(0,0,0,0.25)'
                 onChangeText={(text) => this.setState({ title: text })}
             /> : null;

        return (
            <Animatable.View style={[styles.container, { height: focused && body ? Platform.os === 'ios' ? 105 : 125 + height : Platform.os === 'ios' ? 50 : 70 }]}>
                <Grid>
                    <Col size={9} style={styles.col}>
                        { _rating }
                        { _title }
                        <Animatable.View ref="bodyInputView">
                            <TextInput
                                ref={input => this.input = input}
                                style={[styles.input, { height }]}
                                placeholder="Add a Review"
                                underlineColorAndroid='rgba(0,0,0,0.25)'
                                value={body}
                                onChangeText={(text) => this.setState({ body: text })}
                                onFocus={this.focus.bind(this)}
                                onBlur={this.blur.bind(this)}
                                onContentSizeChange={(e) => this.setState({ height: e.nativeEvent.contentSize.height < 100 ? e.nativeEvent.contentSize.height : 100 })}
                                multiline
                            />
                        </Animatable.View>
                    </Col>
                    <Col size={1} style={styles.col2}>
                        { this.renderButton() }
                    </Col>
                </Grid>
            </Animatable.View>
        );
    }

}

export default ReviewBar;