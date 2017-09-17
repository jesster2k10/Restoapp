/**
 * Created by jesseonolememen on 25/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    Colours
} from '../../Themes';
import {
    TextButton
} from '../../Components';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/NewsItemStyles';
import dateformat from 'dateformat';

const NewsItem = ({ news, navigation }) => {
    const {
        title,
        author,
        publishedDate,
        content,
        image,
        categories
    } = news;

    let categoryNames = categories.map(({ name }) => name);
    let _categories = categoryNames.join(', ');

    return (
        <TouchableOpacity onPress={() => navigation.navigate('SelectedNews', { news })}>
            <View style={styles.container}>
                <Grid>
                    <Row>
                        <Image source={{ uri: image.secure_url }} style={styles.image} />
                    </Row>
                    <Row>
                        <View style={styles.bodyContainer}>
                            <Grid>
                                <Row style={styles.row}>
                                    <Text style={styles.title}>{ title }</Text>
                                </Row>
                                <Row style={styles.row}>
                                    <Grid>
                                        <Col>
                                            <Grid>
                                                <Col size={1.5}>
                                                    <Icon color={Colours.mainTextColor} size={17} name="ios-calendar-outline" />
                                                </Col>
                                                <Col size={9}>
                                                    <Text style={styles.details}>{ dateformat(new Date(publishedDate), "dd mmmm yyyy") }</Text>
                                                </Col>
                                            </Grid>
                                        </Col>
                                        <Col>
                                            <Grid>
                                                <Col size={1.5}>
                                                    <Icon color={Colours.mainTextColor} size={17} name="ios-albums-outline" />
                                                </Col>
                                                <Col size={9}>
                                                    <Text style={styles.details}>{ _categories }</Text>
                                                </Col>
                                            </Grid>
                                        </Col>
                                    </Grid>
                                </Row>
                                <Row>
                                    <Text style={styles.desc}>{ content.brief }</Text>
                                </Row>
                            </Grid>
                        </View>
                    </Row>
                </Grid>
            </View>
        </TouchableOpacity>
    );
};

export default NewsItem;