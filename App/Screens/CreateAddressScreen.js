import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';
import {
  Row,
  InputRow,
  NavigationButton,
  SubmitButton,
} from '../Components';
import * as actions from '../Actions/FormActions';
import { addAddress } from '../Actions/UserActions';
import strings from '../Config/Localization';
import Constants from '../Config/Constants'
import styles from './Styles/CreateAddressScreenStyles';
import { NavigationActions } from 'react-navigation';

const KEY = 'ADDRESS';

class CreateAddressScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.create ? strings.createAddress : strings.updateAddress,
    headerMode: 'screen',
    headerLeft: <NavigationButton navigation={navigation} back size={25} />
  });

  changed = false;

  submit = () => {
    const address = {
      street1: this.props.address,
      suburb: this.props.city,
      state: this.props.state,
      postcode: this.props.postcode,
      country: Constants.COUNTRY.NAME,
    };

    const name = {
      first: this.props.name.split(' ').slice(0, -1).join(' '),
      last: this.props.name.split(' ').slice(-1).join(' '),
    };

    this.props.addAddress(this.props.token, this.props.id, address, name, this.props.email, this.props.phone);
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.loading && nextProps.success) {
      this.props.navigation.goBack();
      this.props.resetAddressForm();
    } else if (!nextProps.loading && !nextProps.success && nextProps.error) {
      alert(nextProps.error.message || nextProps.error || 'Failed to create address');
    }

    if (!nextProps.navigation.state.params.create && !this.changed) {
      let address = nextProps.navigation.state.params.address;

      this.props.changeName(false, address.name.first + ' ' + address.name.last, KEY)
      this.props.changeEmail(false, address.email, KEY);
      this.props.changePhone(false, address.phone, KEY);
      this.props.changeState(false, address.state, KEY);
      this.props.changeCity(false, address.suburb, KEY);
      this.props.changeAddress(false, address.street1, KEY);
      this.props.changeZip(false, address.postcode, KEY);

      this.changed = true;
    }

    if (nextProps.success && !nextProps.error && !nextProps.loading) {
       nextProps.navigation.dispatch(NavigationActions.back())
    }
  };

  render = () => {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          { this.props.loading ? 
            <View style={styles.centered}>
              <Spinner
                isVisible
                size={17}
                type='Arc'
                color='white'/>
              <Text style={styles.loader}>{ strings.validatingAddress }</Text>
            </View>
          :
          <View>
            <InputRow
              placeholder={strings.enterFullName}
              label={strings.fullName} 
              value={this.props.name}
              error={this.props.errors.name}
              onChangeText={val => this.props.changeName(true, val, KEY)}
            />
            <InputRow
              placeholder={strings.enterEmail}
              label={strings.email}
              value={this.props.email}
              error={this.props.errors.email}
              keyboardType="email-address"
              onChangeText={val => this.props.changeEmail(true, val, KEY)}
            />
            <InputRow
              placeholder={strings.enterPhone}
              label={strings.phone}
              value={this.props.phone}
              error={this.props.errors.phone}
              onChangeText={val => this.props.changePhone(true, val, KEY)}
              phone
            />
            <InputRow
              placeholder={strings.enterAddress}
              label={strings.address}
              value={this.props.address}
              error={this.props.errors.address}
              onChangeText={val => this.props.changeAddress(true, val, KEY)}
            />
            <InputRow
              placeholder={strings.enterCity}
              label={strings.city}
              value={this.props.city}
              error={this.props.errors.city}
              onChangeText={val => this.props.changeCity(val, KEY)}
            />
            <InputRow
              placeholder={strings.enterPostcode}
              label={strings.postcode}
              value={this.props.postcode}
              error={this.props.errors.postcode}
              onChangeText={val => this.props.changeZip(val, KEY)}
            />
            <InputRow
              placeholder={strings.enterState}
              label={strings.state}
              value={this.props.state}
              error={this.props.errors.state}
              onChangeText={val => this.props.changeState(val, KEY)}
            />
          </View> }
        </ScrollView>
        { this.props.valid ? <SubmitButton
          title={strings.finish}
          style={styles.submit}
          onPress={this.submit}
        /> : <Text style={styles.disclaimer}>{ strings.checkAgainForInvalidFields }</Text>}
      </View>
    )
  }
}

const mapStateToProps = ({ addressForm, auth, user }) => ({
  name: addressForm.name,
  email: addressForm.email,
  phone: addressForm.phone,
  address: addressForm.address,
  city: addressForm.city,
  state: addressForm.state,
  postcode: addressForm.zip,
  valid: addressForm.valid,
  errors: addressForm.errors,
  token: auth.token,
  id: auth.userId,
  loading: addressForm.loading,
  success: addressForm.createSuccess,
  error: addressForm.createError,
});

export default connect(mapStateToProps, {
  ...actions,
  addAddress,
})(CreateAddressScreen);
