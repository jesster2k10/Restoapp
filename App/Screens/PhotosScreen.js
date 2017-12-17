/**
 * Created by jesseonolememen on 28/08/2017.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    FlatList,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    NavigationButton,
    Center,
    Section
} from '../Components';
import {
    ApplicationStyles,
    Metrics
} from '../Themes';
import {
    Grid,
    Row
} from 'react-native-easy-grid';
import {
    getAllPhotos,
    getAllGalleries
} from '../Actions/PhotoActions';
import Spinner from 'react-native-spinkit';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-easy-toast';
import strings from '../Config/Localization';
import styles from './Styles/PhotosScreenStyles';

class PhotosScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.photos,
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    componentWillMount() {
        const { getAllGalleries, token } = this.props;

        getAllGalleries(token);
    }

    componentWillReceiveProps({ error, success }) {
        if (error && !success) {
            this.refs.toast.show(error);
        }
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({item}) => {
        const {
            navigate,
        } = this.props.navigation;

        return (
            <TouchableOpacity onPress={() => navigate('Gallery', { gallery: item })}>
                <View style={styles.headerImageContainer}>
                    <Image style={styles.headerImage} source={{ uri: item.heroImage.secure_url }} />
                    <Section top={5} bottom={5} left={15} right={15}>
                        <Text style={styles.headerTitle}>{ item.name }</Text>
                    </Section>
                </View>
            </TouchableOpacity>
        )
    };

    _renderPhotos() {
        const { galleriesLoading, galleries } = this.props;

        if (galleriesLoading) {
            return (
                <Center full>
                    <Spinner color='white' size={17} type="Arc" />
                </Center>
            )
        }

        return (
            <FlatList
                data={galleries}
                numColumns={1}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem.bind(this)}
            />
        )
    }

    render() {
        const { galleries } = this.props;

        let galleriesTitle = galleries && galleries.length > 0 ?
        (
            <Row size={1}>
                <Section left={12} top={10}>
                    <Text style={styles.galleryTitle}>{ strings.galleries }</Text>
                </Section>
            </Row>
        ) : null;

        return (
            <View style={styles.container}>
                <Center full>
                    <Grid>
                        { galleriesTitle }
                        <Row size={9}>
                            { this._renderPhotos() }
                        </Row>
                    </Grid>
                </Center>
                <Toast
                    ref="toast"
                    style={ApplicationStyles.toast.body}
                    textStyle={ApplicationStyles.toast.text}
                />
            </View>
        )
    };
}

const mapStateToProps = ({ photos, auth }) => ({
    photos: photos.photos,
    error: photos.error,
    loading: photos.loading,
    success: photos.success,
    galleriesError: photos.galleries_error,
    galleriesSuccess: photos.galleries_success,
    galleriesLoading: photos.galleries_loading,
    galleries: photos.galleries,
    token: auth.token
});

export default connect(mapStateToProps, { getAllPhotos, getAllGalleries })(PhotosScreen);