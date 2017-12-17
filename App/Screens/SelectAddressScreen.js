import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import {
    NavigationButton,
    AddressItem
} from '../Components';
import {
    selectAddress,
    resetSelectAddressDone
} from '../Actions/FormActions';
import {
    getAddresses
} from '../Actions/UserActions';
import Spinner from 'react-native-spinkit';
import styles from './Styles/SelectAddressScreenStyles';
import strings from '../Config/Localization';
import { connect } from 'react-redux';

class SelectAddressScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.selectAddress,
        headerLeft: <NavigationButton navigation={navigation} back size={25} />
    });

    state = {
        message: strings.noSavedAddresses
    };

    componentDidMount() {
        const {
            getAddresses,
            token,
            userId
        } = this.props;

        getAddresses(token, userId);
        this.setErrorMessage = false;

    }

    renderAddresses = () => {
        const {
            loading,
            error,
            success,
            addresses
        } = this.props;

        if (loading) {
            return (
                <View style={[styles.container, styles.centered]}>
                    <Spinner size={17} type='Arc' color='white'/>
                </View>
            )
        }

        if (error && !loading && !success && !this.setErrorMessage) {
            this.setErrorMessage = true;
            this.setState({ message: error });
        }

        if (addresses && addresses.length > 0) {
            return (
                <ScrollView style={styles.container}>
                    {addresses.map(address => {
                        return (
                            <AddressItem address={address} navigation={this.props.navigation} />
                        )
                    })}
                </ScrollView>
            )
        } else {
            return (
                <View style={[styles.container, styles.centered]}>
                    <Text style={styles.body}>{this.state.message}</Text>
                </View>
            )
        }
    };

    render() {
        return this.renderAddresses();
    }
}

const mapStateToProps = ({ user, auth, checkout }) => ({
    addresses: user.addresses,
    loading: user.get_addresses_loading,
    error: user.get_addresses_error,
    success: user.get_addresses_success,
    token: auth.token,
    userId: auth.userId,
});

const actions = {
    selectAddress,
    getAddresses,
    resetSelectAddressDone
};

export default connect(mapStateToProps, actions)(SelectAddressScreen);