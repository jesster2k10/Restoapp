import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    View,
    StyleSheet,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
    addReview
} from '../Actions/MealActions';
import {
    Tab,
    Tabs,
    Text,
    Root,
} from 'native-base';
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Meal,
    MealReviews,
    NavigationButton,
    ReviewBar
} from '../Components';
import styles from './Styles/MealScreenStyles';
import { ApplicationStyles } from '../Themes'
import strings from '../Config/Localization';
import Constants from '../Config/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class MealScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.meal.name,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} cart />,
        gesturesEnabled: false
});

    onSubmit = (review) => {
        const { addReview, token, user, navigation } = this.props;
        const { navigate } = navigation;

        if (token && user) {
            addReview(review, user, token);
        } else {
            // TODO: Change to show button to take to login
            Alert.alert(
                strings.unauthorized,
                strings.loginToContinue,
                [
                    {
                        text: strings.ok,
                        onPress: () => navigate('LandingScreen')
                    },
                    {
                        text: strings.cancel,
                        style: 'cancel'
                    },
                ],
            )
        }
    };

    componentWillReceiveProps({ addReviewSuccess, addReviewError, addReviewLoading }) {
        if (!addReviewSuccess && !addReviewLoading && addReviewError) {
            this.refs.toast.show(addReviewError, DURATION.LENGTH_LONG);
        }

        if (addReviewSuccess && !addReviewError && !addReviewLoading) {
            window.EventBus.trigger(Constants.EVENTS.ADDED_REVIEW);
        }
    }


    render() {
        const { meal } = this.props.navigation.state.params;
        const { addReviewLoading } = this.props;

        return (
            <Root>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.container}>
                        <Tabs initialPage={0} tabBarUnderlineStyle={styles.tabBarUnderline}>
                            <Tab heading={strings.details}
                                 activeTabStyle={styles.tab}
                                 tabStyle={styles.tab}
                                 textStyle={styles.tabTitle}
                                 activeTextStyle={styles.activeTabTitle}>
                                <Meal meal={meal} navigation={this.props.navigation} />
                            </Tab>
                            <Tab heading={strings.reviews}
                                 activeTabStyle={styles.tab}
                                 tabStyle={styles.tab}
                                 textStyle={styles.tabTitle}
                                 activeTextStyle={styles.activeTabTitle}>
                                <View style={{flex: 1,flexDirection:'column', justifyContent: 'flex-end'}}>
                                    <MealReviews
                                        meal={meal} />
                                    <ReviewBar
                                        meal={meal}
                                        onSubmit={this.onSubmit}
                                        loading={addReviewLoading} />
                                </View>
                            </Tab>
                        </Tabs>
                    </View>
                </KeyboardAvoidingView>
                <Toast
                    ref="toast"
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}/>
            </Root>
        )
    };
}

const actions = {
  addReview
};

const mapStateToProps = ({ meal, auth }) => ({
    addReviewSuccess: meal.add_review_success,
    addReviewLoading: meal.add_review_loading,
    addReviewError: meal.add_review_error,
    token: auth.token,
    user: auth.userId
});

export default connect(mapStateToProps, actions)(MealScreen);