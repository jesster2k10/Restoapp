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
import strings from '../../Config/Localization';
import Constants from '../../Config/Constants';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

class CheckoutConfirmation extends Component {
    showReceipt = () => {
        const {
            navigate
        } = this.props.navigation;

        navigate('Receipt');
    };

    render() {
        const {
            charge,
            method,
            location,
            order,
        } = this.props;

        return (
            <View style={styles.container}>
                {  method === 'DELIVERY' ? <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.lat,
                        longitude: location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapView.Marker.Animated
                        coordinate={new MapView.AnimatedRegion({ latitude: location.lat, longitude: location.lng })}
                        title="location" />
                </MapView> : null }
                <Section left={10} right={10} top={20} style={styles.section}>
                    <Text style={styles.heading}>{ method === 'DELIVERY' ? strings.orderOnTheWay : strings.orderBeingPrepared }</Text>
                </Section>
                <Section padding={10} style={styles.section}>
                    <Text style={styles.body}>{ method === 'DELIVERY' ? strings.mealReadyIn : strings.collectMealIn }</Text>
                </Section>
                <Section style={styles.section}>
                    <Text style={styles.arrivalTime}>{ `${order.waitTime} ${strings.minutes}` }</Text>
                </Section>
                <View style={styles.rowContainer} big>
                    <Row action={() => this.props.navigation.navigate('Receipt')} title="Show Receipt" style={styles.row} disclosure />
                    <Row title="Contact Support" style={styles.row} disclosure action={() => window.EventBus.trigger(Constants.EVENTS.INFO_NAV_BUTTON_PRESS)}/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ checkout, auth, payments, shippingForm, orders, }) => ({
    charge: payments.charge,
    method: checkout.delivery_method,
    location:  shippingForm.geo_code_location,
    order: orders.placedOrder,
});

const actions = {

};

export default connect(mapStateToProps, actions)(CheckoutConfirmation);