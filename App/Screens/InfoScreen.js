/**
 * Created by jesseonolememen on 30/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Linking,
    Platform,
    StatusBar
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    Section,
    NavigationButton,
    Row,
    TextButton
} from '../Components'
import ParallaxView from 'react-native-parallax-view';
import SafariView from "react-native-safari-view";
import strings from '../Config/Localization';
import Info from '../Config/Info';
import styles from './Styles/InfoScreenStyles';
import MapView from 'react-native-maps';

class InfoScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.info,
        headerLeft: <NavigationButton navigation={navigation} size={25} />,
        headerRight: <NavigationButton navigation={navigation} cart />,
    });

    _openURL = (url) => {
        if (Platform.OS === 'ios') {
            SafariView.isAvailable()
                .then(() => {
                    StatusBar.setBarStyle('dark-content', true);
                    SafariView.show({url: url})
                })
                .catch(() => Linking.openURL(url));

            SafariView.addEventListener(
                "onDismiss",
                () => {
                    StatusBar.setBarStyle("light-content", true);
                }
            );
        } else {
            Linking.openURL(url);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ParallaxView
                    backgroundSource={{ uri: 'https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg' }}
                    windowHeight={200}>
                    <View style={styles.bodyContainer}>
                        <Section padding={15} column>
                            <Text style={styles.title}>{ strings.about }</Text>
                            <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum eu sem sit amet imperdiet. Cras euismod orci ut sem pulvinar, at posuere enim rhoncus. Quisque scelerisque faucibus ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris mauris mauris, ullamcorper nec condimentum in, venenatis quis quam. Curabitur porta felis vulputate ultrices imperdiet. Suspendisse convallis tortor et porta iaculis. Quisque vel nibh non nulla commodo feugiat. Cras diam sapien, semper id ullamcorper vitae, auctor eget neque. Duis porta elit quam, sed ullamcorper nunc euismod a. Suspendisse convallis lectus id enim aliquet, eget rutrum turpis mattis. Vivamus sodales id orci sed congue. Phasellus ullamcorper sapien est, et malesuada nisl aliquam eget.</Text>
                        </Section>
                        <Section top={15} bottom={15} column>
                            <Text style={[styles.title, { paddingLeft: 15, paddingBottom: 15 }]}>{ strings.location }</Text>
                            <MapView style={styles.map}
                                initialRegion={{
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <MapView.Marker.Animated
                                    coordinate={new MapView.AnimatedRegion({ latitude: 37.78825, longitude: -122.4324})}/>
                            </MapView>
                            <Text style={styles.addressFirst}>{ Info.address.street }</Text>
                            <Text style={styles.address}>{ Info.address.city }</Text>
                            <Text style={styles.address}>{ Info.address.state }</Text>
                            <Text style={styles.address}>{ Info.address.zip }</Text>
                            <Text style={styles.addressLast}>{ Info.address.country }</Text>
                        </Section>
                        <Section left={15} top={15} bottom={5} column full>
                            <Text style={styles.title}>{ strings.openingTimes }</Text>
                        </Section>
                        <Row icon="ios-clock" big first title={strings.mondayToFriday} body={Info.openingTimes} />
                        <Section left={15} right={15} bottom={5} top={15} column full>
                            <Text style={styles.title}>{ strings.links }</Text>
                        </Section>
                        <Row
                            icon="ios-globe"
                            action={() => this._openURL(Info.website)}
                            big
                            disclosure
                            first
                            title={strings.website}
                            body={Info.website}
                        />
                        <Row
                            icon="logo-facebook"
                            action={() => this._openURL(`https://facbeook.com/${Info.facebook}`)}
                            big
                            disclosure
                            colOneSize={2}
                            title={strings.facebook}
                            body={`@${Info.facebook}`}
                        />
                        <Row
                            icon="logo-twitter"
                            action={() => this._openURL(`https://twitter.com/${Info.twitter}`)}
                            big
                            disclosure
                            title={strings.twitter}
                            body={`@${Info.twitter}`}
                        />
                        <Row
                            icon="logo-snapchat"
                            action={() => this._openURL(`https://snapchat.com/add/${Info.snapchat}`)}
                            big
                            disclosure
                            last
                            title={strings.snapchat}
                            body={Info.snapchat}
                        />
                        <Row
                            icon="ios-mail"
                            big
                            disclosure
                            last
                            colOneSize={4}
                            title={strings.email}
                            body={Info.email}
                        />
                    </View>
                </ParallaxView>
            </View>
        )
    };
}

export default InfoScreen;