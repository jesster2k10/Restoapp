import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import {
    getFavouritesForUser,
    removeFavourite
} from '../../Actions/FavouriteActions';
import {
    Center,
    FavouriteItem
} from '../../Components';
import {
    Colours
} from '../../Themes';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';

class FavouritesList extends Component {
    componentWillMount() {
        const { getFavouritesForUser, token, userId } = this.props;

        getFavouritesForUser(token, userId);
    }

    renderItem = ({ item }) => {
        return <FavouriteItem meal={item.meal} key={item._id} navigation={this.props.navigation} />
    };

    keyExtractor = (item) => item._id;

    renderList = () => {
        const {
            getLoading,
            favourites
        } = this.props;

        if (getLoading) {
            return (
                <Center>
                    <Spinner color={Colours.mainTextColor} size={17} type='Arc' />
                </Center>
            )
        }

        return (
            <FlatList
                data={favourites}
                numColumns={2}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={this.keyExtractor}
            />
        )
    };

    render() {
        return this.renderList();
    }
}

const mapStateToProps = ({ auth, favourites }) => ({
    favourites: favourites.favourites,
    token: auth.token,
    isUserLoggedIn: auth.userLoggedIn,
    userId: auth.userId,
    getLoading: favourites.get_loading,
    getError: favourites.get_error,
    getSuccess: favourites.get_success,
    deleteLoading: favourites.delete_loading,
    deleteSuccess: favourites.delete_success,
    deleteError: favourites.delete_error,
});

const actions = {
    getFavouritesForUser,
    removeFavourite
};

export default connect(mapStateToProps, actions)(FavouritesList);
