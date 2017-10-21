import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Image
} from 'react-native';
import {
    Row,
    RowHeader,
    Section,
    SubmitButton,
    NavigationButton
} from '../Components';
import {
    getPrice,
    getSubtotal
} from '../Helpers';
import {
    Button
} from 'native-base';
import {
    Images
} from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/ReceiptScreenStyles';
import strings from '../Config/Localization';

class ReceiptScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.receipt,
        headerLeft: <NavigationButton navigation={navigation} size={25} back />,
    });

    renderProductList() {
        const {
            cart
        } = this.props;

        if (cart && cart.products) {
            const {
                products
            } = cart;

            return products.map(product => {
                const {
                    count,
                    name,
                    _id
                } = product;

                return (
                    <View style={styles.detailContainer} key={_id}>
                        <View style={styles.col}>
                            <Text style={styles.items}>{`x${count} `}</Text>
                            <Text style={styles.items}>{ name }</Text>
                        </View>
                        <View style={styles.end}>
                            <Text style={styles.items}>{ getPrice(product) }</Text>
                        </View>
                    </View>
                )
            })
        }
    };

    render() {
        const {
            charge
        } = this.props;

        const {
            currency,
            status,
            created,
            amount
        } = charge;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <RowHeader style={styles.header}>Details</RowHeader>
                    <Row title="Date" body="18 Oct 2017" style={styles.row} />
                    <Row title="Amount" body={amount/100} style={styles.row} />
                    <Row title="Currency" body={currency.toUpperCase()} style={styles.row} />
                    <Row title="Status" body={status} style={styles.row} />
                    <Section top={10} style={styles.column}>
                        <RowHeader style={styles.header}>Order</RowHeader>
                        { this.renderProductList() }
                    </Section>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <SubmitButton title="Cancel Order" />
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ payments, checkout }) => ({
    charge: payments.charge,
    cart: checkout.cart
});

const actions = {

};

export default connect(mapStateToProps, actions)(ReceiptScreen);