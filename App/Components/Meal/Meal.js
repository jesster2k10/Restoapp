import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { getSavedCart, addMealToCart } from '../../Actions/CartActions';
import {
    Text,
    Container,
    Button,
    Icon,
} from 'native-base';
import ActionSheet from '@yfuks/react-native-action-sheet';
import {
    Col,
    Row,
    Grid
} from "react-native-easy-grid";
import {
    Row as RowComponent,
    Ribbon,
    NotificationBody
} from '../../Components';
import { Colours } from '../../Themes';
import { getPrice } from '../../Helpers';
import Notification from 'react-native-in-app-notification';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles/MealStyles';
import strings from '../../Config/Localization';

class Meal extends Component {
    componentWillMount() {
        this.props.getSavedCart();
    }

    componentWillReceiveProps({ addedToCart, meal, error }) {
        if (addedToCart) {
            if (this.successNotification) {
                this.successNotification.show(
                    strings.formatString(strings.addedToCart, meal.name),
                    null,
                    () => navigate('Cart'),
                );
            }
        }

        if (!addedToCart && error !== null) {
            if (this.errorNotification) {
                this.errorNotification.show();
            }
        }
    }

    addToCart() {
        const { cart, meal } = this.props;
        const { options } = meal;

        if (cart != null) {
            if (options.length > 0) {

                let _options = [...options.map(option => {
                    return option.name;
                }), strings.cancel];

                let CANCEL_INDEX = _options.length - 1;

                ActionSheet.showActionSheetWithOptions({
                        options: _options,
                        cancelButtonIndex: CANCEL_INDEX,
                        tintColor: Colours.darkBody
                    }, (idx) => {
                        if (idx != CANCEL_INDEX) {
                            this.props.addMealToCart(cart, meal, _options[idx]);
                        }
                    }
                );
            } else {
                this.props.addMealToCart(cart, meal);
            }
        }
    }

    renderOptions() {
        const { meal } = this.props;

        let rows = [];

        if (meal.options.length > 0) {
            meal.options.forEach(option => {
                rows.push(
                    <View style={styles.padding} key={option._id}>
                        <Text style={styles.rowHeader}>{strings.options}</Text>
                        <RowComponent title={ option.name } body={ getPrice(meal) } />
                    </View>
                )
            })
        }

        return rows.filter((elem, index, self) => index === self.indexOf(elem));
    }

    renderRibbon() {
        if (!this.props.meal.isAvaliable) {
            return <Ribbon soldOut />
        }
    }

    render() {
        const { meal } = this.props;

        const {
            description,
            name,
            chargesTax,
            featuredImage,
            options
        } = meal;

        return (
            <ScrollView style={styles.container}>
                <Container>
                    <Grid>
                        <Row style={{ height: 200 }}>
                            <ImageBackground style={styles.image} source={{ uri: featuredImage.secure_url }}>
                                <LinearGradient
                                    colors={Colours.mainGradient}
                                    style={styles.gradient}
                                />
                            </ImageBackground>
                            <View style={styles.priceContainer}>
                                { this.renderRibbon }
                            </View>
                            <View style={styles.titleContainer}>
                                <Grid>
                                    <Col style={styles.end}>
                                        <Text style={styles.medium}>{ name }</Text>
                                    </Col>
                                    <Col style={[styles.end, styles.right]}>
                                        <Text style={styles.medium}>{ getPrice(meal) }</Text>
                                    </Col>
                                </Grid>
                            </View>
                        </Row>
                        <Row style={{ height: 50 }}>
                            <Col>
                                <Button style={styles.button} iconLeft full light>
                                    <Text style={styles.buttonTitle}>{strings.favourite}</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button style={styles.button} full light onPress={() => this.addToCart()}>
                                    <Text style={styles.buttonTitle}>{ options.length == 0 ? strings.addToCart : strings.choseAnOption }</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{ flexDirection: 'column' }}>
                            <View style={styles.padding}>
                                <Text style={styles.rowHeader}>{strings.description}</Text>
                                <Text style={styles.description}>{ description }</Text>
                            </View>
                            { this.renderOptions() }
                        </Row>
                    </Grid>
                </Container>

                <Notification
                    height={40}
                    notificationBodyComponent={NotificationBody}
                    ref={(ref) => { this.successNotification = ref; }} />

                <Notification
                    height={40}
                    backgroundColour="red"
                    notificationBodyComponent={ () => <NotificationBody error title={strings.formatString(strings.failedToAddToCart, name)} /> }
                    ref={(ref) => { this.errorNotification = ref; }} />

            </ScrollView>
        )
    };
}

const mapStateToProps = ({ cart }) => ({
    cart: cart.cart_saved_identifier,
    addedToCart: cart.added_to_cart,
    error: cart.cart_error
});

export default connect(mapStateToProps, { getSavedCart, addMealToCart })( Meal );