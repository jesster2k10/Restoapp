/**
 * Created by jesseonolememen on 16/10/2017.
 */
import { Dimensions, Platform } from 'react-native';

export function isiPhoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

export function ifiPhoneX(iphoneXStyle, regularStyle) {
    if (isiPhoneX()) {
        return iphoneXStyle;
    } else {
        return regularStyle
    }
}