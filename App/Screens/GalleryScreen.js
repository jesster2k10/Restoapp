import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    NavigationButton,
    Center,
    Section
} from '../Components';
import styles from './Styles/GalleryScreenStyles';
import strings from '../Config/Localization';
// import { connect } from 'react-redux';

class GalleryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.gallery.name,
        headerLeft: <NavigationButton navigation={navigation} size={25} back />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    _keyExtractor = (item) => item.id;

    _renderItem = ({ item, index }) => {
        console.log(item);

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Photo', { photo: item })}>
                <Image style={index % 2 === 0 ? styles.leftImage : styles.rightImage} source={{ uri: item.secure_url }} />
            </TouchableOpacity>
        )
    };

    render() {
        const {
            images,
        } = this.props.navigation.state.params.gallery;

        console.log(images);

        return (
            <View style={styles.container}>
                <FlatList
                    data={images}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

export default GalleryScreen;
