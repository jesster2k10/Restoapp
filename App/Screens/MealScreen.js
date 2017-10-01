import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    Tab,
    Tabs,
    Text
} from 'native-base';
import {
    Meal,
    MealReviews,
    NavigationButton,
    ReviewBar
} from '../Components';
import styles from './Styles/MealScreenStyles';
import strings from '../Config/Localization';

class MealScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.meal.name,
        headerLeft: <NavigationButton navigation={navigation} back />,
        headerRight: <NavigationButton navigation={navigation} cart />
    });

    render() {
        const { meal } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Tabs initialPage={0} tabBarUnderlineStyle={styles.tabBarUnderline}>
                    <Tab heading={strings.details}
                         activeTabStyle={styles.tab}
                         tabStyle={styles.tab}
                         textStyle={styles.tabTitle}
                         activeTextStyle={styles.activeTabTitle}>
                        <Meal meal={meal} navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading={strings.reviews}
                         activeTabStyle={styles.tab}
                         tabStyle={styles.tab}
                         textStyle={styles.tabTitle}
                         activeTextStyle={styles.activeTabTitle}>
                        <View style={{flex: 1,flexDirection:'column', justifyContent: 'flex-end'}}>
                            <MealReviews meal={meal} />
                            <ReviewBar />
                        </View>
                    </Tab>
                </Tabs>
            </View>
        )
    };
}

export default MealScreen;