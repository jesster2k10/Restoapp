    /**
 * Created by jesseonolememen on 20/10/2017.
 */
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    Section,
    Row
} from '../../Components';
import { connect } from 'react-redux';
import styles from './Styles/CheckoutConfirmationStyles';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

class CheckoutConfirmation extends Component {
    showReceipt = () => {
        const {
            navigate
        } = this.props.navigation;

        navigate('Receipt');
        console.log('Showing REceipt')
    };

    render() {
        const {
            charge,
        } = this.props;

        console.log("Render")

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapView.Marker.Animated
                        coordinate={new MapView.AnimatedRegion({ latitude: 37.78825, longitude: -122.4324})}
                        title="location" />
                </MapView>
                <Section left={10} right={10} top={20} style={styles.section}>
                    <Text style={styles.heading}>Your Order is On The Way</Text>
                </Section>
                <Section padding={10} style={styles.section}>
                    <Text style={styles.body}>Your meal(s) should arrive within the next:</Text>
                </Section>
                <Section style={styles.section}>
                    <Text style={styles.arrivalTime}>45 Minutes</Text>
                </Section>
                <View style={styles.rowContainer} big>
                    <Row action={() => this.props.navigation.navigate('Receipt')} title="Show Receipt" style={styles.row} disclosure />
                    <Row title="Contact Support" style={styles.row} disclosure />
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ checkout, auth, payments }) => ({
    charge: payments.charge
});

const actions = {

};

export default connect(mapStateToProps, actions)(CheckoutConfirmation);