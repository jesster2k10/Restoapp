import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import {
    NavigationButton,
} from '../Components';
import {
    Grid,
    Col
} from 'react-native-easy-grid';
import {
    Colours
} from '../Themes';
import MenuList from  '../Components/MenuList';
import strings from  '../Config/Localization';
import Constants from  '../Config/Constants';
import styles from './Styles/MenuScreenStyles';
import ActionSheet from '@yfuks/react-native-action-sheet';

class MenuScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.menu,
        drawerLabel: strings.menu,
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: (
            <Grid>
                <Col size={1} style={styles.col}>
                    <NavigationButton navigation={navigation} action={() => { MenuScreen._add() }} style={styles.addButtonStyle} size={25} icon="ios-add-outline" />
                </Col>
                <Col size={6} style={styles.col}>
                    <NavigationButton navigation={navigation} size={25} cart />
                </Col>
            </Grid>
        )
    });

    static _add = () => {
        window.EventBus.trigger(Constants.EVENTS.ADD_NAV_BUTTON_PRESS)
    };

    showAddActionSheet = () => {
        const { navigate } = this.props.navigation;

        ActionSheet.showActionSheetWithOptions({
                options: [strings.makeAReservation, strings.cancel],
                cancelButtonIndex: 1,
                tintColor: Colours.darkBody
            }, (idx) => {
                if (idx == 0) {
                    navigate("Reservations");
                }
            }
        );
    };

    componentDidMount() {
        window.EventBus.on(Constants.EVENTS.ADD_NAV_BUTTON_PRESS, this.showAddActionSheet.bind(this))
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuList navigation={this.props.navigation} />
            </View>
        );
    }
};

export default MenuScreen;