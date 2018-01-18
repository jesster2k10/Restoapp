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
        <TouchableOpacity onPress={!meal.isAnExtra ? () => navigate('Meal', { meal }) : null}>
            <View style={styles.container}>
                <Grid>
                    { featuredImage ?
                        (
                            <Col size={4.5}>
                                <Image source={{ uri: featuredImage.secure_url }} style={styles.image} />
                            </Col>
                        ) : null
                    }
                    <Col size={featuredImage ? 8 : 10}>
                        <View style={[styles.bodyContainer, { padding: featuredImage ? 0 : 0 }]}>
                            <Grid>
                                <Row style={styles.row}>
                                    <Grid>
                                        <Col size={9}>
                                            <Text style={styles.title}>{ name }</Text>
                                        </Col>
                                        <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                            <TouchableOpacity onPress={deleteAction}>
                                                <Icon name='ios-close-outline' style={styles.icon} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                    { description ? <Text style={styles.desc}>{ truncate(description, 65, '...') }</Text> : null }
                                </Row>
                                <Row>
                                    <Section top={featuredImage ? 10 : 0} full end style={{ justifyContent: 'center' }}>
                                        <Grid>
                                            <Col size={featuredImage ? 7 : 8} style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                                                <Text style={styles.price}>{ getPrice(meal) }</Text>
                                                { _renderCount(meal) }
                                            </Col>
                                            <Col size={featuredImage ? 3 : 2}>
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