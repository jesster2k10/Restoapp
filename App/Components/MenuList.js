import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllMeals, getMealsForCategory }from '../Actions/MealActions';
import { FlatList, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { MenuItem } from './MenuItem';

class MenuList extends Component {
    componentWillMount() {
        if (this.props.category) {
            this.props.getMealsForCategory(this.props.category._id, this.props.token);
        } else {
            this.props.getAllMeals();
        }
    }

    componentWillReceiveProps({ navigation }) {
        this.navigation = navigation;
    }

    keyExtractor = (item, index) => item._id;

    renderItem({ item }) {
        return <MenuItem meal={item} navigation={this.navigation} />
    }

    renderList() {
        const { meals, loading } = this.props;

        if (loading === true) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='white' size={17} type="Arc" />
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.props.category ? this.props.categoryMeals : this.props.meals}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this.keyExtractor}
                />
            )
        }
    }

    render() {
        return this.renderList();
    };
}

const mapStateToProps = ({ meals, auth }) => {
    return {
        meals: meals.meals,
        error: meals.error,
        loading: meals.loading,
        token: auth.token,
        categoryMeals: meals.category_meals
    }
};

export default connect(mapStateToProps, { getAllMeals, getMealsForCategory })(MenuList);