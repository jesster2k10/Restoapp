import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  NavigationButton,
  Section,
  InputRow,
  Row,
  RowHeader,
  TextButton,
  SubmitButton,
  Center,
} from '../Components';
import {
  updateUserName,
  updateUserProfile,
  updateUser,
} from '../Actions/UserActions';
import strings from '../Config/Localization';
import styles from './Styles/ProfileScreenStyles';
import Spinner from 'react-native-spinkit';
import ImagePicker from 'react-native-image-picker';

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: strings.profile,
    headerLeft: <NavigationButton navigation={navigation} size={25}  />,
  });

  state = {
    chosenImage: null,
    loading: false,
  };

  pickerOptions = {
    title: strings.selectProfileImage,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  componentWillMount = () => {
    window.EventBus.on('ProfileScreen.Save', this.save);
  }

  save = () => {
    const {
      loggedIn,
      user,
      updateUser,
      loading,
      nameError,
    } = this.props;

    if (loggedIn && user) {
      if (loading) {
        alert('Please wait for pending upadates');
      } else {
        if (!nameError) {
          updateUser();
        }
      }
    } else {
      alert('Please login to continue')
    }
  }

  showAddress = () => {
    const {
      navigation,
    } = this.props;

    navigation.navigate('SelectAddress', { backRoute: 'Profile', create: false })
  }

  showPassword = () => {
    const {
      navigation,
    } = this.props;

    navigation.navigate('ChangePassword', { backRoute: 'Profile' })
  }

  showImagePicker = () => {
    this.setState({
      loading: true,
    })
    ImagePicker.showImagePicker(this.pickerOptions, (response) => {
      this.setState({
        loading: false,
      })
      if (response.error) {
        alert(response.error);
      } else {
        this.setState({
          chosenImage: response.uri
        });
        this.props.updateUserProfile(response.uri);
      }
    });
  }

  showLogin = () => {
    this.props.navigation.navigate('LandingScreen')
  }

  render = () => {
    const { user } = this.props;

    let profile, name, email, fullName, fName = null;

    if (user) {
      profile = user.profileImage;
      name = user.name;
      fName = user.fullName;
      email = user.email;

      fullName = fName ? fName : name && name.first && name.last ? `${name.first} ${name.last}` : name && name.first ? `${name.first}` : name.last;

      console.log(fullName)
    } else {
      return (
        <View style={styles.container}>
          <Center>
            <TextButton onPress={() => this.showLogin()}>{ strings.loginToContinue }</TextButton>
          </Center>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.scrollContainer}>
          <View style={styles.header}>
            { this.props.loading || this.state.loading ? <View style={styles.center}>
              <Spinner
                isVisible
                size={17}
                type='Arc'
                color='white'/>
            </View> : null }
            <Image
              source={{ uri: this.state.chosenImage ? this.state.chosenImage : profile ? profile.secure_url : `https://ui-avatars.com/api/?name=${name && name.first && name.last ? `${name.first}+${name.last}` : name && name.first ? `${name.first}` : 'John+Doe'}` }}
              style={styles.profileImage}
            />
            <Section top={15} column center>
              <Text style={styles.name}>
                {fullName}
              </Text>
              <TextButton onPress={() => this.showImagePicker()}>{ strings.changeProfileImage }</TextButton>
            </Section>
          </View>
          <View style={styles.body}>
            <Row
              title={strings.addresses}
              body={strings.viewPreviousAddresses}
              action={this.showAddress.bind(this)}
              colOneSize={3}
              style={styles.row}
              disclosure
            />
            <Section top={20} bottom={20}>
              <InputRow
                placeholder={strings.enterFullName}
                label={strings.fullName}
                value={fullName}
                error={this.props.nameError}
                onChangeText={val => this.props.updateUserName(val)}
                onBlur={() => this.save()}
              />
            </Section>
            <Row
              title={strings.password}
              body={strings.changePassword}
              action={this.showPassword.bind(this)}
              colOneSize={3}
              style={styles.row}
              disclosure
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ user, auth }) => ({
  user: user.currentUser,
  nameError: user.changeNameError,
  loading: user.updateUserLoading,
  error: user.updateUserError,
  loggedIn: auth.userLoggedIn,
});

export default connect(mapStateToProps, {
  updateUserName,
  updateUserProfile,
  updateUser,
})(ProfileScreen);
