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
        const { getAllPhotos, getAllGalleries, token } = this.props;

        getAllPhotos(token);
        getAllGalleries(token);
    }

    componentWillReceiveProps({ error, success }) {
        if (error && !success) {
            this.refs.toast.show(error);
        }
    }

    _keyExtractor = (item) => item.id;

    _renderHeaderItem = ({item}) => {
        return (
            <View style={styles.headerImageContainer}>
                <Image style={styles.headerImage} source={{ uri: item.heroImage.secure_url }} />
                <Section top={5} bottom={5} left={15} right={15}>
                    <Text style={styles.headerTitle}>{ item.name }</Text>
                </Section>
            </View>
        )
    };

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Photo', { photo: item })}>
                <Image style={index % 2 === 0 ? styles.leftImage : styles.rightImage} source={{ uri: item.image.secure_url }} />
            </TouchableOpacity>
        )
    };

    _renderPhotos() {
        const { loading, photos } = this.props;

        if (loading) {
            return <Spinner color='white' size={17} type="Arc" />
        }

        return (
            <FlatList
                data={photos}
                numColumns={2}
                ListHeaderComponent={this._renderHeader.bind(this)}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }

    _renderHeader() {
        const { galleriesLoading, galleries } = this.props;

        if (galleriesLoading) {
            return <Spinner color='white' size={17} type="Arc" />
        }

        if (galleries && galleries.length > 0) {
            return (
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={galleries}
                        sliderWidth={Metrics.fullWidth}
                        itemWidth={Metrics.fullWidth}
                        sliderHeight={300}
                        itemHeight={200}
                        autoplay
                        renderItem={this._renderHeaderItem}
                    />
                </View>
            )
        }

        return null;
    }

    render() {
        const { galleries } = this.props;

        let galleriesTitle = galleries && galleries.length > 0 ?
        (

            <Row size={1}>
                <Section left={12} top={10}>
                    <Text style={styles.galleryTitle}>Galleries</Text>
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