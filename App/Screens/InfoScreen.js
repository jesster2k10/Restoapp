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
                    backgroundSource={{ uri: Info.featureImage }}
                    windowHeight={200}>
                    <View style={styles.bodyContainer}>
                        <Section padding={15} column>
                            <Text style={styles.title}>{ strings.about }</Text>
                            <Text style={styles.body}>{ Info.about }</Text>
                        </Section>
                        <Section top={15} bottom={15} column>
                            <Text style={[styles.title, { paddingLeft: 15, paddingBottom: 15 }]}>{ strings.location }</Text>
                            <MapView style={styles.map} initialRegion={Info.address.coordinates}>
                                <MapView.Marker.Animated coordinate={new MapView.AnimatedRegion(Info.address.coordinates)}/>
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
                        <Row big first title={strings.mondayToFriday} body={Info.openingTimes} />
                        <Section left={15} right={15} bottom={5} top={15} column full>
                            <Text style={styles.title}>{ strings.links }</Text>
                        </Section>
                        <Row
                            action={() => this._openURL(`${Info.websiteProxy}://${Info.website}`)}
                            big
                            disclosure
                            first
                            title={strings.website}
                            body={Info.website}
                        />
                        <Row
                            action={() => this._openURL(`https://facbeook.com/${Info.facebook}`)}
                            big
                            disclosure
                            title={strings.facebook}
                            body={Info.facebook}
                        />
                        <Row
                            action={() => this._openURL(`https://twitter.com/${Info.twitter}`)}
                            big
                            disclosure
                            title={strings.twitter}
                            body={Info.twitter}
                        />
                        <Row
                            action={() => this._openURL(`https://snapchat.com/add/${Info.snapchat}`)}
                            big
                            disclosure
                            last
                            title={strings.snapchat}
                            body={Info.snapchat}
                        />
                    </View>
                </ParallaxView>
            </View>
        )
    };
}

export default InfoScreen;
