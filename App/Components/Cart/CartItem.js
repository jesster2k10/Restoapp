import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Button,
    Icon
} from 'native-base';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    getPrice,
    truncate
} from '../../Helpers';
import SimpleStepper from 'react-native-simple-stepper';
import { Colours } from '../../Themes';
import { Section } from '../../Components';
import styles from './Styles/CartItemStyles';

const _renderCount = ({ count }) => {
    if (count > 1) {
        return (
            <View style={styles.countContainer}>
                <Text style={styles.count}>{ `x${count}` }</Text>
            </View>
        );
    }
};

const CartItem = ({ deleteAction, meal,onQuantityIncreased, onQuantityDecreased,navigation }) => {
    const {
        name,
        featuredImage,
        description,
        count
    } = meal;

    const {
        navigate
    } = navigation;

    return (
        <TouchableOpacity onPress={() => navigate('Meal', { meal })}>
            <View style={styles.container}>
                <Grid>
                    <Col size={4.5}>
                        <Image source={{ uri: featuredImage.secure_url }} style={styles.image} />
                    </Col>
                    <Col size={8}>
                        <View style={styles.bodyContainer}>
                            <Grid>
                                <Row style={styles.row}>
                                    <Grid>
                                        <Col size={9}>
                                            <Text style={styles.title}>{ name }</Text>
                                        </Col>
                                        <Col size={1}>
                                            <TouchableOpacity onPress={deleteAction}>
                                                <Icon name='ios-close-outline' style={styles.icon} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                    <Text style={styles.desc}>{ truncate(description, 65, '...') }</Text>
                                </Row>
                                <Row>
                                    <Section top={10} full end style={{ justifyContent: 'center' }}>
                                        <Grid>
                                            <Col size={6} style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                                                <Text style={styles.price}>{ getPrice(meal) }</Text>
                                                { _renderCount(meal) }
                                            </Col>
                                            <Col size={4}>
                                                <SimpleStepper
                                                    iconColor={Colours.mainTextColor}
                                                    backgroundColor={Colours.accent}
                                                    tintColor={Colours.darkAccent}
                                                    minimumValue={0}
                                                    initialValue={meal.count || 0}
                                                    maximumValue={10}
                                                    onIncrement={onQuantityIncreased}
                                                    onDecrement={onQuantityDecreased}
                                                />
                                            </Col>
                                        </Grid>
                                    </Section>
                                </Row>
                            </Grid>
                        </View>
                    </Col>
                </Grid>
            </View>
        </TouchableOpacity>
    );
};

export default CartItem;