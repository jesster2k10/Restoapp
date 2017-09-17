/**
 * Created by jesseonolememen on 26/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image
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
} from '../../Themes';
import StarRating from 'react-native-star-rating';
import Constants from '../../Config/Constants';
import strings from '../../Config/Localization';
import styles from './Styles/MealReviewItemStyles';
import moment from 'moment';

const MealReviewItem = ({ item }) => {
    const {
        user,
        rating,
        review,
        created
    } = item;

    let title = item.title ? <Text style={styles.title}>{ item.title }</Text> : null;

    return (
        <View style={styles.container}>
            <Grid>
                <Row size={1}>
                    <Grid>
                        <Col>
                            <View style={styles.profileContainer}>
                                <Image style={styles.profileImage} source={{uri: user.profileImage ? user.profileImage.secure_url : Constants.BLANK_PROFILE_IMAGE }} />
                                <Text style={styles.smallText}>{ user.name ? `${user.name.first} ${user.name.last}` : strings.unkown }</Text>
                            </View>
                        </Col>
                        <Col style={styles.end}>
                            <Text style={styles.smallText}>{ moment(created).fromNow() }</Text>
                        </Col>
                    </Grid>
                </Row>
                <Row size={9.5}>
                    <View style={styles.body}>
                        <StarRating
                            disabled
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
                            containerStyle={styles.starContainer}
                        />
                        { title }
                        <Text style={styles.text}>{ review }</Text>
                    </View>
                </Row>
            </Grid>
        </View>
    );
};

export default MealReviewItem;