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
import moment from 'moment';

class ReceiptScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.receipt,
        headerLeft: <NavigationButton navigation={navigation} size={25} back />,
    });

    renderProductList() {
        const {
            products
        } = this.props;

        if (products) {
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
                            <Text style={styles.items2}>{ name }</Text>
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
            charge,
            order,
        } = this.props;

        let currency = charge.currency || order.currency;
        let status = charge.status || order.status;
        let amount = charge.amount || order.total;

        const {
            orderDate,
        } = order;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <RowHeader style={styles.header}>Details</RowHeader>
                    <Row title="Date" body={moment(orderDate).format('MMMM Do YYYY')} style={styles.row} />
                    <Row title="Amount" body={amount/1000} style={styles.row} />
                    <Row title="Currency" body={currency.toUpperCase()} style={styles.row} />
                    <Row title="Status" body={status} style={styles.row} />
                    <Section top={10} style={styles.column}>
                        <RowHeader style={styles.header}>Order</RowHeader>
                        { this.renderProductList() }
                    </Section>
                </ScrollView>
                {/*<View style={styles.bottomContainer}>*/}
                    {/*<SubmitButton title="Cancel Order" />*/}
                {/*</View>*/}
            </View>
        )
    }
}

const mapStateToProps = ({ payments, cart, orders }) => {
    let products = [];

    if (cart.cart) {
        if (cart.cart.products != undefined) {
            products = [...cart.cart.products.reduce( (mp, o) => {
                if (!mp.has(o._id)) mp.set(o._id, Object.assign({ count: 0 }, o));
                mp.get(o._id).count++;
                return mp;
            }, new Map).values()];
        }
    }

    return {
        charge: payments.charge,
        products,
        order: orders.placedOrder,
    }
};

const actions = {

};

export default connect(mapStateToProps, actions)(ReceiptScreen);