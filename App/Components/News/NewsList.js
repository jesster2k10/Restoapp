/**
 * Created by jesseonolememen on 25/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    getAllNews
} from '../../Actions/NewsActions';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    NewsItem
} from '../../Components';
import {
    Colours
} from '../../Themes';
import Spinner from 'react-native-spinkit';

class NewsList extends Component {
    componentWillMount() {
        const { getAllNews, token } = this.props;

        getAllNews(token)
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem({ item, index }) {
        return <NewsItem news={item} key={index} navigation={this.props.navigation} />
    }

    _renderList = () => {
        const { loading } = this.props;

        if (loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color={Colours.mainTextColor} size={17} type='Arc' />
                </View>
            );
        }

        return (
            <FlatList
                data={this.props.news}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={this._keyExtractor}
            />
        )
    };

    render() {
        return this._renderList();
    };
}

const mapStateToProps = ({ news, auth }) => ({
    error: news.error,
    loading: news.loading,
    success: news.success,
    news: news.news,
    token: auth.token
});

export default connect(mapStateToProps, { getAllNews })(NewsList);