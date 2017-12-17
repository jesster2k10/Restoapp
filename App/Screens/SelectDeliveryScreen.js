import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    selectDeliveryType
} from '../Actions';
import {
    NavigationButton,
    Row
} from '../Components';
import styles from './Styles/SelectDeliveryScreenStyles';
import strings from '../Config/Localization';
import { connect } from 'react-redux';

class SelectDeliveryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.selectDeliveryType,
        headerLeft: <NavigationButton navigation={navigation} back size={25} />
    });

    selectDelivery() {
        const {
            selectDeliveryType,
            navigation,
        } = this.props;

        selectDeliveryType('DELIVERY');
        navigation.goBack();
    }

    selectCollection() {
        const {
            selectDeliveryType,
            navigation
        } = this.props;

        selectDeliveryType('COLLECTION');
        navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Row
                    title={strings.delivery}
                    body={strings.haveThisOrderDelivered}
                    action={this.selectDelivery.bind(this)}
                    colOneSize={3}
                    style={styles.row} />
                <Row
                    title={strings.collection}
                    body={strings.collectThisOrder}
                    action={this.selectCollection.bind(this)}
                    colOneSize={3}
                    style={styles.row} />
            </View>
        )
    }
}


const mapStateToProps = ({ checkout }) => ({
    method: checkout.delivery_method,
});

const actions = {
    selectDeliveryType,
};

export default connect(mapStateToProps, actions)(SelectDeliveryScreen);