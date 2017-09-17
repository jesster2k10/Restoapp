/**
 * Created by jesseonolememen on 16/08/2017.
 */
import {
    StyleSheet
} from 'react-native';
import {
    Colours,
    Fonts
} from '../../../Themes';

const cardImage = {
    height: 20,
    width: 40,
    marginLeft: 10,
    backgroundColor: 'transparent',
    tintColor: 'white'
};

const textInput = {
    flex: 1,
    backgroundColor: Colours.lighterBody,
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    ...Fonts.style.normalSmall,
    fontFamily: Fonts.type.thin,
    color: Colours.mainTextColor,
};

const button = {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 0,
    marginBottom: 15,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: Colours.lighterBody,
};

const buttonText = {
    ...Fonts.style.medium,
    color: Colours.mainTextColor,
    textAlign: 'center',
    fontSize: 13
};

const container = {
    backgroundColor: Colours.lighterBody,
    borderLeftWidth: 0,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
    borderColor: 'rgba(0,0,0,0.1)',
    flex: 1,
};


export const cardFormStyles = {
    cardNumberInput: textInput,
    cvcInput: textInput,
    cardNumberImage: cardImage,
    cvcImage: cardImage,
    cardExpiryImage: cardImage,
    monthYearTextInput: textInput,
    textInput: textInput,
    addButton: button,
    addButtonText: buttonText,
    scanCardButton: button,
    scanCardButtonText: buttonText,
    errorTextContainer: {
        height: 50,
        backgroundColor: Colours.lightBody,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        ...Fonts.style.small,
        color: 'white',
        textAlign: 'center',
    },
    monthYearContainer: container,
    cvcContainer: {
        ...container,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    cardNumberContainer: container,
    addCardContainer: {
        ...container,
        backgroundColor: Colours.lightBody,
        borderColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'flex-end'
    },
    activityIndicatorContainer: {
        ...container,
        justifyContent: 'center'
    },
    invalid: {
        borderWidth: 0.5,
        borderColor: Colours.soldOutRibbon.background,
    },
};

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    paymentIcon: {
        flex: 1,
        width: 100/1.5,
        height: 25/1.5,
    },
    selectedPaymentIcon: {
        flex: 1,
        width: 100/1.5,
        height: 25/1.5,
        tintColor: 'white'
    },
    paymentButton: {
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        marginLeft: 5,
        marginRight: 5
    },
    selectedButton: {
        backgroundColor: Colours.navigation.background,
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        marginLeft: 5,
        marginRight: 5
    },
    icon: {
        color: 'black'
    },
    selectedIcon: {
        color: 'white'
    },
    column: {
        flexDirection: 'column',
        flex: 1
    }
});