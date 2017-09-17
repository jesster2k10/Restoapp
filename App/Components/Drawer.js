/**
 * Created by jesseonolememen on 21/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Thumbnail,
    Button,
    Root,
    Toast
} from 'native-base';
import {
    Grid,
    Row,
    Col
} from 'react-native-easy-grid';
import {
    Section
} from '../Components';
import { DrawerItems } from 'react-navigation';
import {
    Colours
} from '../Themes';
import styles from './Styles/DrawerStyles';
import strings from '../Config/Localization';
import {
    logout
} from '../Actions/AuthActions';
import Constants from '../Config/Constants';

class Drawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionButtonTitle: strings.logout,
            actionButtonAction: undefined
        }
    }

    componentWillReceiveProps({ userLoggedIn, success, error, requestedLogout, navigate, token, logout }) {
        if (requestedLogout) {
            if (success && userLoggedIn) {
                navigate('LandingScreen');
            }

            if (error && userLoggedIn) {
                console.log(error)
            }
        }
    }

    _action = () => {
        const { userLoggedIn, token, logout, navigate } = this.props;

        if (userLoggedIn) {
            logout(token)
        } else {
            navigate('LandingScreen', { register: false });
        }
    };

    render() {
        const { props, userLoggedIn, user } = this.props;

        let name = user && user.name.first != "EMPTY_NAME" && user.name.last != "EMPTY_NAME" ? `${user.name.first} ${user.name.last}` : strings.unknown;
        let image = user && user.profileImage ? user.profileImage.secure_url : Constants.BLANK_PROFILE_IMAGE;

        return (
            <Root>
                <View style={styles.container}>
                    <Grid>
                        <Row size={4}>
                            <Grid>
                                <Row size={7}>
                                    <Section left={15} right={15} bottom={10} style={styles.thumbnailContainer}>
                                        <Thumbnail large source={{uri: image }} />
                                    </Section>
                                </Row>
                                <Row size={3} style={{ flexDirection: 'column' }}>
                                    <Section left={15} right={15}>
                                        <Text style={styles.username}>{ name }</Text>
                                    </Section>
                                    <Section>
                                        <Button transparent onPress={this._action}>
                                            <Text style={styles.logoutButtonText}>{ userLoggedIn ? strings.logout : strings.login }</Text>
                                        </Button>
                                    </Section>
                                </Row>
                            </Grid>
                        </Row>
                        <Row size={8}>
                            <DrawerItems
                                {...props}
                                style={styles.drawerContainer}
                                labelStyle={styles.drawerItem}
                                activeBackgroundColor={Colours.lightBody}
                                inavtiveBackgroundColor={'transparent'}
                            />
                        </Row>
                    </Grid>
                </View>
            </Root>
        )
    }
}

const mapStateToProps = ({ auth, user }) => ({
    loading: auth.loading,
    success: auth.logout_success,
    error: auth.logout_error,
    userLoggedIn: auth.userLoggedIn,
    token: auth.token,
    requestedLogout: auth.requested_logout,
    user: user.currentUser
});

const actions = {
    logout
};

export default connect(mapStateToProps, actions)(Drawer);