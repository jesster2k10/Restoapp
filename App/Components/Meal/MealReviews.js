import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    MealReviewList
} from '../../Components';
import styles from './Styles/MealStyles';

class MealReviews extends Component {
    render() {
        const { meal } = this.props;

        return (
            <View style={styles.container}>
                <MealReviewList meal={meal} />
            </View>
        )
    };
}

export { MealReviews };