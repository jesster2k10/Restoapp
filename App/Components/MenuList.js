import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllMeals }from '../Actions/MealActions';
import { FlatList, View } from 'react-native';
import { Spinner } from 'native-base';
import { MenuItem } from './MenuItem';

class MenuList extends Component {
    componentWillMount() {
        this.props.getAllMeals();
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                    <Spinner color='white' />
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.props.meals}
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

const mapStateToProps = ({ meals }) => {
    return {
        meals: meals.meals,
        error: meals.error,
        loading: meals.loading
    }
};

export default connect(mapStateToProps, { getAllMeals })(MenuList);