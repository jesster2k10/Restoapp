/**
 * Created by jesseonolememen on 18/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts
} from '../../Themes';

const text = {
    ...Fonts.style.normalSmall,
    color: Colours.mainTextColor,
    textAlign: 'center',
    marginRight: 4,
    backgroundColor: 'transparent'
};

const iconContainer = {
    marginLeft: 4,
    backgroundColor: 'transparent'
};

export const paymentForm = {
    addButton: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        marginTop: 0,
        marginBottom: 15,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: Colours.lighterBody,
    },
    addButtonText: {
        ...text,
        fontFamily: Fonts.type.medium
    },
    applePayContainer: {
        ...iconContainer
    },
    cardTextOuterContainer: {
       borderColor: 'transparent'
    },
    cardBrandImage: {
        marginRight: 8,
        backgroundColor: Colours.lighterBody
    },
    cardsLoadingIndicator: {
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: 'transparent'
    },
    cardTextLast4: {
        ...text
    },
    cardTextEndingIn: {
        ...text,
        fontFamily: Fonts.type.thin
    },
    cardTextType: {
        ...text
    },
    touchableOpacityContainer: {
        backgroundColor: 'transparent',
        borderLeftWidth: 0,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    cardTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colours.lighterBody,
    },
    innerTouchableOpacityContainerLast: {
        backgroundColor: 'transparent'
    },
    paymentMethodsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    paymentMethodsInnerContainer: {
        backgroundColor: 'transparent',
        borderLeftWidth: 0,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopWidth: 0,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    paymentMethodsInnerViewContainer: {
        backgroundColor: Colours.lighterBody
    },
    selectPaymentContainer: {
        backgroundColor: Colours.lightBody,
        flex: 1
    },
};