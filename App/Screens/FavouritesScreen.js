import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    getFavouritesForUser,
    removeFavourite
} from '../Actions/FavouriteActions';
import {
    FavouritesList,
    NavigationButton
} from '../Components';
import Toast, { DURATION } from 'react-native-easy-toast';
import {
    ApplicationStyles
} from '../Themes';
import styles from './Styles/FavouritesScreenStyles';
import strings from '../Config/Localization';
import { connect } from 'react-redux';

class FavouritesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.favourites,
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: <NavigationButton navigation={navigation} size={25} cart />
    });

    componentWillReceiveProps(props) {
        const {
            getLoading,
            getError,
            getSuccess,
            deleteLoading,
            deleteError,
            deleteSuccess
        } = props;

        if (!getLoading && getError && !getSuccess) {
            this.toast.show(getError, DURATION.LENGTH_LONG);
        }

        if (!deleteLoading && deleteError && !deleteSuccess) {
            this.toast.show(deleteError, DURATION.LENGTH_LONG);
        }
    }

    render() {
        const {
            navigation
        } = this.props;

        return (
            <View style={styles.container}>
                <FavouritesList navigation={navigation} />
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}/>
            </View>
        )
    }
}

const mapStateToProps = ({ auth, favourites }) => ({
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

export default connect(mapStateToProps, actions)(FavouritesScreen);