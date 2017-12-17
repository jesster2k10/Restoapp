import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import {
    MealExtraItem,
    NavigationButton,
    SubmitButton
} from '../Components';
import {
    addMealToCart,
} from '../Actions/CartActions';
import Constants from '../Config/Constants';
import styles from './Styles/MealExtrasScreenStyles';
import strings from '../Config/Localization';

class MealExtrasScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.menu,
        drawerLabel: strings.menu,
        headerLeft: <NavigationButton navigation={navigation} size={25} back />,
        headerRight: <NavigationButton navigation={navigation} cart />
    });

    static _done = () => {
        window.EventBus.trigger(Constants.EVENTS.DONE_SELECTING_MEAL_EXTRAS);
    };

    componentWillMount = () => {
        window.EventBus.on(Constants.EVENTS.DONE_SELECTING_MEAL_EXTRAS, this.done);
    };

    done = () => {
        const {
            navigate,
        } = this.props.navigation;

        navigate('Cart');
    };

    renderItem = ({ item }) => <MealExtraItem extra={item} />;

    render() {
        const {
            extras,
        } = this.props.navigation.state.params.meal;

        return (
            <View style={styles.container}>
                <FlatList
                    data={extras}
                    renderItem={this.renderItem}
                    />
                <SubmitButton
                    title={strings.doneAddingExtras}
                    onPress={this.done} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToActions = dispatch => ({
   addExtraToCart: () => dispatch(addMealToCart),
});

export default connect(mapStateToProps, mapDispatchToActions)(MealExtrasScreen);
