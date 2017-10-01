/**
 * Created by jesseonolememen on 01/10/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
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
} from '../../Themes'
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/ReviewBarStyles';

class ReviewBar extends Component {
    constructor() {
        super();

        this.state = {
            focused: false,
        }
    }

    render() {
        const { focused } = this.state;

        let rating = focused ? <StarRating
                disabled={false}
                halfStarEnabled
                iconSet="Ionicons"
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                halfStar="ios-star-half"
                emptyStarColor={Colours.yellow}
                starColor={Colours.yellow}
                starSize={25}
                maxStars={5}
                rating={3}
                space={false}
                starPadding={5}
                containerStyle={styles.starContainer}
            /> : null;

        return (
            <View style={styles.container}>
                <Grid>
                    <Col size={9}>
                        <Grid>
                            <Row>
                                { rating }
                            </Row>
                            <Row>
                                <TextInput
                                    ref={input => this.input = input}
                                    style={styles.input}
                                    placeholder="Add a review"
                                    underlineColorAndroid='white'
                                    onFocus={() => this.setState({ focused: true })}
                                    onBlur={() => this.setState({ focused: false })}
                                />
                            </Row>
                        </Grid>
                    </Col>
                    <Col size={1} style={{ justifyContent: 'flex-end' }}>
                        <Icon name="ios-done-all-outline" size={30} color="#fff" />
                    </Col>
                </Grid>
            </View>
        );
    }

};

export default ReviewBar;