/**
 * Created by jesseonolememen on 15/08/2017.
 */
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    Icon,
    Text,
    Container,
    Button
} from 'native-base';
import {
    IconTabBar,
    NavigationButton,
    RowHeader,
    Section,
    ShippingForm
} from '../Components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CreditCardInput } from "react-native-credit-card-input";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import strings from '../Config/Localization';
import styles from './Styles/CheckoutScreenStyles';

class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.checkout,
        headerLeft: <NavigationButton navigation={navigation} back icon="ios-close-outline" />,
        headerRight: <NavigationButton navigation={navigation} action={() => { CheckoutScreen._info() }} size={24} icon="ios-help-buoy-outline" />,
    });

    static _info() {
        console.log('Help')
    };

    _goToPayment = () => {
        this.tabView.goToPage(1);
    };

    render() {
        return (
            <Container>
                <ScrollableTabView
                    locked
                    renderTabBar={() => <IconTabBar noChange />}
                    ref={(tabView) => { this.tabView = tabView; }}
                    initialPage={1}
                >
                    <View style={styles.container} tabLabel={`ios-pin-outline,${strings.delivery}`}>
                        <KeyboardAwareScrollView extraScrollHeight={150} style={styles.container}>
                            <View style={styles.container}>
                                <Section padding={20}>
                                    <RowHeader capital center>
                                        { strings.shippingAddress }
                                    </RowHeader>
                                </Section>
                                <ShippingForm/>
                            </View>
                        </KeyboardAwareScrollView>
                        <View style={styles.buttonContainer}>
                            <Button full style={styles.button} onPress={() => this._goToPayment()}>
                                <Text style={styles.buttonTitle}>{ strings.nextPaymentInfo }</Text>
                            </Button>
                        </View>
                    </View>
                    <KeyboardAwareScrollView extraScrollHeight={150} style={styles.container} tabLabel={`ios-card-outline,${strings.payment}`}>
                        <View>
                            <Section top={20} bottom={0}>
                                <RowHeader capital center>{ strings.payingWith }</RowHeader>
                            </Section>
                            <Section padding={15} full style={{ flexDirection: 'column' }}>
                                <Section bottom={10}>
                                    <Button>
                                        <Text>Credit Card</Text>
                                    </Button>
                                </Section>
                                <Section bottom={10}>
                                    <RowHeader capital center>{ strings.or }</RowHeader>
                                </Section>
                                <Section bottom={10}>
                                    <Button>
                                        <Text>PayPal</Text>
                                    </Button>
                                </Section>
                                <Section bottom={10}>
                                    <Button>
                                        <Text>Apple Pay</Text>
                                    </Button>
                                </Section>
                                <Section bottom={10}>
                                    <Button>
                                        <Text>Cash</Text>
                                    </Button>
                                </Section>
                            </Section>
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={styles.container} tabLabel={`ios-done-all-outline,${strings.confirm}`}>
                    </View>
                </ScrollableTabView>
            </Container>
        )
    };
}

export default CheckoutScreen;