/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { StackNavigator } from 'react-navigation'
import LandingScreen from '../Screens/LandingScreen';

import styles from './Styles/AppNavigationStyles'

const Root = StackNavigator({
    LandingScreen: { screen: LandingScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LandingScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
});

export default Root;
