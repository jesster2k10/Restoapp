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
    getRandomInt,
    truncate
} from '../../Helpers';

const FavouriteItem = ({ meal, navigation }) => {
    const { navigate } = navigation;
    const {
        description,
        name,
        featuredImage
    } = meal;

    return (
        <TouchableOpacity onPress={() => navigate('Meal', { meal })}>
            <View style={styles.container}>
                <Image style={[styles.image, { height: getRandomInt(90, 150) }]} source={{ uri: featuredImage.secure_url }} />
                <Section padding={9}>
                    <Grid>
                        <Row>
                            <Text style={styles.name}>{ name }</Text>
                        </Row>
                        <Row>
                            <Text style={styles.excerpt}>{ truncate(description, 40, '...') }</Text>
                        </Row>
                    </Grid>
                </Section>
            </View>
        </TouchableOpacity>
    );
};

export default FavouriteItem;