/**
 * Created by jesseonolememen on 26/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    FlatList,
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    Colours,
    ApplicationStyles
} from '../../Themes';
import {
    TextButton,
    MealReviewItem
} from '../../Components';
import {
    getReviews
} from '../../Actions/MealActions';
import Spinner from 'react-native-spinkit';
import Toast, { DURATION } from 'react-native-easy-toast';
import strings from '../../Config/Localization';
import styles from './Styles/MealReviewListStyles';

class MealReviewList extends Component {
    componentWillMount() {
        const { token, meal, getReviews } = this.props;

        getReviews(token, meal);
    }
    componentWillReceiveProps({ error }) {
        if (error) {
            this.refs.toast.show(error, DURATION.LENGTH_LONG);
        }
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem = ({ item }) => {
        return <MealReviewItem item={item} navigation={this.props.navigation} />
    };

    _renderList = () => {
        const { reviews, loading } = this.props;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner color={Colours.mainTextColor} size={17} type='Arc' />
                </View>
            )
        }

        if (reviews.length < 1) {
            return (
                <View style={styles.container}>
                    <Text style={styles.label}>{ strings.noReviews }</Text>
                    <TextButton full buttonStyle={styles.button}>{ strings.addOne }</TextButton>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={reviews}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
            )
        }
    };

    render() {
        return (
            <View>
                { this._renderList() }
                <Toast
                    ref="toast"
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}/>
            </View>
        )
    };
}

const mapStateToProps = ({ meal, auth }) => ({
    reviews: meal.reviews,
    loading: meal.loading,
    error: meal.error,
    token: auth.token,
});

const actions = {
    getReviews
};

export default connect(mapStateToProps, actions)(MealReviewList);