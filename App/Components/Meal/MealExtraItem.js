/**
 * Created by jesseonolememen on 01/12/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Grid,
    Col
} from 'react-native-easy-grid';
import {
    Icon,
    Text,
} from 'native-base';
import Spinner from 'react-native-spinkit';
import {
    SubmitButton,
    Center,
} from '../../Components';
import {
    getPrice
} from '../../Helpers';
import {
    addMealToCart,
} from '../../Actions';
import styles from './Styles/MealExtraItemStyles';

class MealExtraItem extends Component {
    state = {
        icon: <Icon name="ios-cart" style={styles.icon} />
    };

    animatedIcon = false;

    componentWillReceiveProps = ({ addExtraSuccess }) => {
        if (addExtraSuccess) {
            this.setState({
                icon: <Icon name="ios-android-done" style={styles.icon} />
            }, setTimeout(() => {
                this.setState({
                    icon: <Icon name="ios-cart" style={styles.icon} />
                })
            }, 5000));

            this.animatedIcon = true;
        }
    };

    sameExtra = (loadingExtra, extra) => {
        if (!loadingExtra) {
            return false;
        }

        if (!extra) {
            return false;
        }

        if (loadingExtra._id && extra._id) {
            return loadingExtra._id === extra._id;
        } else {
            return false;
        }
    };

    render = () => {
        const {
            extra,
            cart,
            loadingExtra,
            addMealToCart,
            loading,
            first
        } = this.props;

        console.log(this.sameExtra(loadingExtra, extra));
        console.log(loadingExtra);

        return (
            <View>
                <View style={[styles.container, { borderTopWidth: first ? 0.5 : 0 }]}>
                    <Grid>
                        <Col size={10} style={styles.rowAlign}>
                            <Text style={styles.medium}>{ extra.name }</Text>
                            <Text style={styles.body}>{ `${getPrice(extra)}` }</Text>
                        </Col>
                        <Col style={styles.end} size={2}>
                            <SubmitButton onPress={() => addMealToCart(cart, extra, null, extra)} height={40} width={50} custom>
                                <Center>
                                    { loading ? (<Spinner
                                            isVisible
                                            size={17}
                                            type='Arc'
                                            color='white'/>) : this.state.icon}
                                </Center>
                            </SubmitButton>
                        </Col>
                    </Grid>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ cart, meal }) => ({
    loading: cart.cart_add_loading,
    loadingExtra: meal.selected_extra,
    addExtraSuccess: meal.add_extra_success,
    cart: cart.cart._id,
});

export default connect(mapStateToProps, { addMealToCart })(MealExtraItem);

MealExtraItem.defaultProps = {
    loading: false,
    addToCart: undefined,
    first: false
};
