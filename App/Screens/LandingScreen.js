import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import {
    Button,
    Text,
    Container
} from 'native-base';
import {
    Images,
    Colours,
    Fonts
} from '../Themes';
import {
    IconButton,
    Section
} from '../Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles/LandingScreenStyles';

const LandingScreen = ({ navigation }) => {
    return (
        <Container style={styles.container}>
            <Image style={styles.backgroundImage} source={Images.background}>
                <LinearGradient
                    colors={Colours.mainGradient}
                    style={styles.gradient}
                    locations={[0.5,0.6]}
                />
            </Image>
            <View style={styles.topContainer}>
                <Section top={30}>
                    <Image style={styles.logo} source={Images.logo} />
                    <Text style={styles.title}>Restoapp</Text>
                </Section>
            </View>
            <View style={styles.mainContainer}>
                <Section bottom={10}>
                    <IconButton
                        icon='google'
                        backgroundColor={Colours.darkGoogle}
                        iconBackgroundColor={Colours.lightGoogle}
                        fontawesome
                    >
                        Sign up with Email
                    </IconButton>
                </Section>
                <Section bottom={10}>
                    <IconButton
                        icon='facebook'
                        backgroundColor={Colours.darkFacebook}
                        iconBackgroundColor={Colours.lightFacebook}
                        fontawesome
                    >
                        Sign up with Google
                    </IconButton>
                </Section>
                <Section>
                    <IconButton
                        icon='email'
                        backgroundColor={Colours.darkBody}
                        iconBackgroundColor={Colours.lightBody}
                    >
                        Sign up with Email
                    </IconButton>
                </Section>
                <Section top={15} bottom={15}>
                    <Button transparent full>
                        <Text style={styles.textButton}>Already registered?</Text>
                    </Button>
                </Section>
                <Button bordered block style={styles.turquoiseButton} onPress={() => navigation.navigate('MainScreen')}>
                    <View style={styles.center}>
                        <Icon name="restaurant-menu" color={Colours.turquoise} size={16} style={styles.turquoiseButtonIcon}/>
                        <Text style={styles.turquoiseButtonTitle}>See Menu</Text>
                    </View>
                </Button>
            </View>
        </Container>
    );
};

export default LandingScreen;