import {
    StyleSheet
} from 'react-native';
import {
    Metrics
} from '../../Themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: Metrics.images.logo,
        height: Metrics.images.logo,
    }
});