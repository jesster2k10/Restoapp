import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';
import { getSavedCart, addMealToCart,  } from '../../Actions/CartActions';
import { clearMealErrors } from '../../Actions/MealActions';
import { favouriteMeal } from '../../Actions/FavouriteActions';
import {
    Text,
    Container,
    Button,
    Icon,
} from 'native-base';
import ActionSheet from '@yfuks/react-native-action-sheet';
import { ApplicationStyles } from '../../Themes';
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
import { getPrice, isMealInCart } from '../../Helpers';
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles/MealStyles';
import strings from '../../Config/Localization';
import Toast, { DURATION } from 'react-native-easy-toast';


class Meal extends Component {
    componentWillMount() {
        this.props.getSavedCart();
    }

    componentWillReceiveProps({ addedToCart, meal, error, favouriteSuccess, favouriteError, favouriteLoading, clearMealErrors }) {
        if (addedToCart) {
            this.refs.toast.show(strings.formatString(strings.addedToCart, meal.name), DURATION.LENGTH_LONG);
            clearMealErrors();
        }

        if (!addedToCart && error !== null) {
            let error = error;

            if (typeof error === Error) {
                error = error.message;
            }

            this.refs.toast.show(error, DURATION.LENGTH_LONG);
            clearMealErrors();
        }

        if (favouriteSuccess && !favouriteError && !favouriteLoading) {
            this.refs.toast.show(strings.formatString(strings.favourited, meal.name), DURATION.LENGTH_LONG);
            clearMealErrors();
        }

        if (favouriteError && !favouriteSuccess && !favouriteLoading) {
            this.refs.toast.show(favouriteError, DURATION.LENGTH_LONG);
            clearMealErrors();
        }
    }

    favourite() {
        const { favouriteMeal, meal, token, userId, isUserLoggedIn, navigation } = this.props;
        const { navigate } = navigation;

        if (isUserLoggedIn) {
            favouriteMeal(token, meal._id, userId);
        } else {
            Alert.alert(strings.signInRequired, strings.pleaseSignIn, [
                {
                    text: strings.ok,
                    onPress: () => navigate('LandingScreen')
                },
                {
                    text: strings.cancel
                }
            ])
        }
    }

    addToCart() {
        const { cart_id, meal, cart, navigation } = this.props;
        const { options } = meal;

        if (cart && cart.products) {
            if (isMealInCart(meal, cart)) {
                navigation.navigate('Cart');
                return
            }
        }

        if (cart_id != null) {
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
                            if (meal.extras && meal.extras.length > 0) {                                this.props.addMealToCart(cart_id, meal, _options[idx]);
                                this.props.addMealToCart(cart_id, meal, _options[idx]);
                                this.props.navigation.navigate('MealExtras', { meal });
                            } else {
                                this.props.addMealToCart(cart_id, meal, _options[idx]);
                            }
                        }
                    }
                );
            } else if (meal.extras && meal.extras.length > 0 && options.length == 0) {
                this.props.addMealToCart(cart_id, meal);
                this.props.navigation.navigate('MealExtras', { meal });
            } else {
                this.props.addMealToCart(cart_id, meal);
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
        const { meal, addToCartLoading, favouriteLoading, cart } = this.props;

        const {
            description,
            name,
            chargesTax,
            featuredImage,
            options
        } = meal;

        return (
            <View style={styles.container}>
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
                                    <Button style={styles.button} block light onPress={() => this.favourite()}>
                                        { favouriteLoading ?  <Spinner color='white' type="Arc" size={17} /> : <Text style={styles.buttonTitle}>{ strings.favourite }</Text> }
                                    </Button>
                                </Col>
                                <Col>
                                    <Button style={styles.button} block onPress={() => this.addToCart()}>
                                        { addToCartLoading ?  <Spinner color='white' type="Arc" size={17} /> : <Text style={styles.buttonTitle}>{ cart && cart.products ? isMealInCart(meal, cart) ? strings.isAddedToCart : options.length == 0 ? strings.addToCart : strings.choseAnOption : options.length == 0 ? strings.addToCart : strings.choseAnOption }</Text> }
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
                    <Toast
                        ref="toast"
                        style={ApplicationStyles.toast.body}
                        textStyle={ApplicationStyles.toast.text}/>
                </ScrollView>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    position='top'
                    textStyle={styles.toastText}/>
            </View>

        )
    };
}
const mapStateToProps = ({ cart, favourites, auth }) => ({
    cart_id: cart.cart_saved_identifier || cart.cart._id != '' ? cart.cart._id : null,
    cart: cart.cart,
    addedToCart: cart.added_to_cart,
    error: cart.cart_error,
    addToCartLoading: cart.cart_add_loading,
    favouriteLoading: favourites.loading,
    favouriteError: favourites.error,
    favouriteSuccess: favourites.success,
    token: auth.token,
    isUserLoggedIn: auth.userLoggedIn,
    userId: auth.userId
});

export default connect(mapStateToProps, { getSavedCart, addMealToCart, favouriteMeal, clearMealErrors })( Meal );