import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    Grid,
    Col
} from 'react-native-easy-grid';
import { Ribbon } from '../Components';
import { Colours } from '../Themes';
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles/MenuItemStyles';
import {
    getPrice,
    truncate
} from '../Helpers';

const MenuItem = ({ meal, navigation }) => {
    const { description, featuredImage, name } = meal;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Meal', { meal: meal })}>
            <View style={styles.container}>
                { featuredImage ? <ImageBackground style={styles.image} source={{ uri: featuredImage.secure_url }} >
                    <LinearGradient
                        colors={Colours.mainGradient}
                        style={styles.gradient}
                    />
                </ImageBackground> : null }
                <View style={styles.priceContainer}>
                    <Ribbon title={getPrice(meal)} />
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Grid>
                            <Col>
                                <Text style={styles.medium}>{ name }</Text>
                                <Text style={styles.small}>{ truncate(description, 40, '...') }</Text>
                            </Col>
                        </Grid>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
    ;
};

export { MenuItem };