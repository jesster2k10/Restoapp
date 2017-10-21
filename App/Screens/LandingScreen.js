import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    signInWithFacebook,
    signInWithGoogle
} from '../Actions/AuthActions';
import {
    View,
    StyleSheet,
    Image,
    LayoutAnimation,
    ImageBackground
} from 'react-native';
import {
    Button,
    Text,
    Container,
    Toast,
    Root
} from 'native-base';
import {
    Images,
    Colours,
    Fonts
} from '../Themes';
import {
    IconButton,
    Section
} from '../Components';
import {
    isiPhoneX
} from '../Helpers';
import strings from '../Config/Localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles/LandingScreenStyles';
import Constants from '../Config/Constants';

class LandingScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    componentWillReceiveProps({ success, facebookError, googleError }) {
        if (success) {
            this.props.navigation.navigate('MainScreen');
        } else {
            if (facebookError || googleError) {
                Toast.show({
                    text: facebookError || googleError,
                    position: 'bottom',
                    buttonText: 'Dismiss'
                });
            }
        }
    }

    render() {
        const { navigation, signInWithFacebook, signInWithGoogle } = this.props;

        return (
            <Root>
                <Container style={styles.container}>
                    <ImageBackground style={styles.backgroundImage} source={Images.background}>
                        <LinearGradient colors={Colours.mainGradient} style={styles.gradient} locations={[0.5,0.6]}/>
                    </ImageBackground>
                    <View style={styles.topContainer}>
                        <Section top={isiPhoneX() ? 120 : 30} column>
                            <Image style={styles.logo} source={Images.logo} />
                            <Text style={styles.title}>{ Constants.COMPANY_NAME }</Text>
                        </Section>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={{ paddingBottom: 10 }}>
                            <IconButton
                                icon='google'
                                backgroundColor={Colours.darkGoogle}
                                iconBackgroundColor={Colours.lightGoogle}
                                fontawesome
                                onPress={() => signInWithGoogle()}>
                                { strings.googleSignup }
                            </IconButton>
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <IconButton
                                icon='facebook'
                                backgroundColor={Colours.darkFacebook}
                                iconBackgroundColor={Colours.lightFacebook}
                                onPress={() => signInWithFacebook()}
                                fontawesome>
                                { strings.facebookSignup }
                            </IconButton>
                        </View>
                        <View>
                            <IconButton icon='email' backgroundColor={Colours.darkBody} iconBackgroundColor={Colours.lightBody} onPress={() => navigation.navigate('Registration', { register: true })}>
                                { strings.emailSignup }
                            </IconButton>
                        </View>
                        <View style={{ paddingTop: 15, paddingBottom: 15 }}>
                            <Button transparent full onPress={() => navigation.navigate('Registration', { register: false })}>
                                <Text style={styles.textButton}>{ strings.alreadyRegistered }</Text>
                            </Button>
                        </View>
                        <Button bordered block style={[styles.turquoiseButton, { marginBottom: isiPhoneX() ? 35 : null }]} onPress={() => navigation.navigate('MainScreen')}>
                            <View style={styles.center}>
                                <Icon name="restaurant-menu" color={Colours.turquoise} size={16} style={styles.turquoiseButtonIcon}/>
                                <Text style={styles.turquoiseButtonTitle}>{ strings.seeMenu }</Text>
                            </View>
                        </Button>
                    </View>
                </Container>
            </Root>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    loading: auth.loading,
    facebookError: auth.facebook_error,
    googleError: auth.google_error,
    success: auth.success
});

const actions = {
    signInWithFacebook,
    signInWithGoogle
};

export default connect(mapStateToProps, actions)(LandingScreen);