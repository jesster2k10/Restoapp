/**
 * Created by jesseonolememen on 26/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    Section
} from '../../Components';
import {
    Grid,
    Row
} from 'react-native-easy-grid';
import {
    getRandomInt
} from '../../Helpers';
import styles from './Styles/CategoryItemStyles';

const CategoryItem = ({ category, navigation }) => {
    const { navigate } = navigation;
    const {
        excerpt,
        name,
        featuredImage
    } = category;

    return (
        <TouchableOpacity onPress={() => navigate('Category', { category })}>
            <View style={styles.container}>
                <Image style={[styles.image, { height: getRandomInt(90, 150) }]} source={{ uri: featuredImage.secure_url }} />
                <Section padding={9}>
                    <Grid>
                        <Row>
                            <Text style={styles.name}>{ name }</Text>
                        </Row>
                        <Row>
                            <Text style={styles.excerpt}>{ excerpt }</Text>
                        </Row>
                    </Grid>
                </Section>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryItem;