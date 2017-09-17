/**
 * Created by jesseonolememen on 26/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    getCategories
} from '../../Actions/CategoryActions';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    CategoryItem
} from  '../../Components';
import {
    ApplicationStyles,
    Colours
} from '../../Themes';
import Toast, { DURATION } from 'react-native-easy-toast';
import Spinner from 'react-native-spinkit';

class CategoriesList extends Component {
    componentWillMount() {
        const { getCategories, token } = this.props;

        getCategories(token);
    }
    _renderItem = ({ item }) => {
        return <CategoryItem category={item} key={item._id} navigation={this.props.navigation} />
    };

    _keyExtractor = (item) => item._id;

    _renderList = () => {
        const { loading, categories } = this.props;

        if (loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={Colours.mainTextColor} size={17} type='Arc' />
                </View>
            )
        }
        return (
            <FlatList
                data={categories}
                numColumns={2}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={this._keyExtractor}
            />
        )
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

const mapStateToProps = ({ categories, auth }) => ({
    token: auth.token,
    categories: categories.categories,
    loading: categories.loading
});

export default connect(mapStateToProps, { getCategories })(CategoriesList);