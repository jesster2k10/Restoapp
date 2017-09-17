/**
 * Created by jesseonolememen on 25/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import {
    Text,
    Thumbnail
} from 'native-base';
import styles from './Styles/NewsItemScreenStyles';
import {
    NavigationButton
} from '../Components';
import {
    Grid,
    Row,
    Col
} from 'react-native-easy-grid';
import ParallaxView from 'react-native-parallax-view';
import strings from '../Config/Localization';

class NewsItemScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.news.title,
        headerLeft: <NavigationButton navigation={navigation} size={25} back />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    _onScroll = (event: Object) => {
        let offsetY = event.nativeEvent.contentOffset.y
    };

    render() {
        const {
            title,
            author,
            publishedDate,
            categories,
            content,
            image
        } = this.props.navigation.state.params.news;

        return (
            <View style={styles.container}>
                <ParallaxView
                    backgroundSource={{ uri: image.secure_url }}
                    windowHeight={200}>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.title}>{ title }</Text>
                        <Text style={styles.body}>{ content.extended }</Text>
                    </View>
                </ParallaxView>
            </View>
        )
    };
}

export default NewsItemScreen;