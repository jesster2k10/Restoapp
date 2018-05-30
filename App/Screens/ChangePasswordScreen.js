import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  changePassword
} from '../Actions/UserActions';
import {
  InputRow,
  SubmitButton,
  NavigationButton,
} from '../Components';
import styles from './Styles/ChangePasswordStyles';
import strings from '../Config/Localization';

class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: strings.changePassword,
    headerMode: 'screen',
    headerLeft: <NavigationButton navigation={navigation} back size={25} />
  });

  state = {
    currentPassword: '',
    newPassword: '',
  }

  componentWillReceiveProps = newProps => {
    if (newProps.success && !newProps.loading && !newProps.error) {
      this.props.navigation.goBack();
      alert(strings.changedPasswordSuccess);
    } else if (!newProps.success && !newProps.loading && newProps.error) {
      alert(strings.failedToChangePassword);
    }
  };

  submit = () => {
    this.props.changePassword(this.state.currentPassword, this.state.newPassword, this.props.token, this.props.id);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <InputRow
          label={strings.currentPassword}
          placeholder={strings.enterCurrentPassword}
          style={styles.row}
          value={this.state.currentPassword}
          onChangeText={currentPassword => this.setState({ currentPassword })}
          password
        />
        <InputRow
          label={strings.newPassword}
          placeholder={strings.enterNewPassword}
          style={styles.row}
          value={this.state.newPassword}
          onChangeText={newPassword => this.setState({ newPassword })}
          password
        />
        <View style={styles.submit}>
          <SubmitButton
            onPress={this.submit}
            title={strings.submit}
            loading={this.props.loading}
          />
        </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({user, auth}) => ({
  success: user.changePasswordSuccess,
  loading: user.changePasswordLoading,
  error: user.changePasswordError,
  token: auth.token,
  id: auth.userId,
})

export default connect(mapStateToProps, { changePassword })(ChangePasswordScreen);
