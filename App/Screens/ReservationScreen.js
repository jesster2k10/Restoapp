/**
 * Created by jesseonolememen on 14/10/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    NavigationButton,
    InputRow,
    RowHeader,
    Section
} from '../Components';
import Tables from '../Components/Reservations/Tables';
import styles from './Styles/ReservationScreenStyles';
import strings from '../Config/Localization';

class ReservationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.reservation,
        headerLeft: <NavigationButton navigation={navigation} size={25} back />,
    });

    render() {
        return (
            <View style={styles.container}>
                <Tables navgation={this.props.navigation} />
            </View>
        )
    };
}

export default ReservationScreen;