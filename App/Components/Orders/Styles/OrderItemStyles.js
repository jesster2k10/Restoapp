import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {
    ApplicationStyles,
    Fonts,
    Colours
} from '../../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.position,
    container: {
        padding: 15,
        backgroundColor: Colours.lighterBody,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.15)',
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowOffset: {
            width: 0,
            height: 2
        },
        marginBottom: 15,
        width: Dimensions.get('window').width,
    },
    date: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        color: Colours.mainTextColor
    },
    price: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.medium,
        color: Colours.ribbon.background
    },
    total: {
        ...Fonts.style.h5,
        color: Colours.mainTextColor
    },
    grid: {
        flexDirection: 'column'
    },
    topContainer: {
        flexDirection: 'row'
    },
    itemContainer: {
        marginTop: 10,
    },
    priceContainer: {
        paddingTop: 10,
        flexDirection: 'row',
    },
    detailContainer: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'row',
        flex: 0.3
    },
    end: {
        flex: 0.7,
        alignItems: 'flex-end'
    },
    items: {
        ...Fonts.style.normalSmall,
        color: Colours.mainTextColor,
        fontSize: 13
    },
    nameContainer: {
        flexDirection: 'row',
        flex: 1,
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
        width: 50,
        height: 30
    },
    paymentIcon: {
        flex: 1,
    },
    paymentButtonContainer: {
        flex: 0.2,
        alignItems: 'flex-end'
    },
    totalContainer: {
        flex: 0.8
    },
    note: {
        color: Colours.mainTextColor,
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.thin,
        fontSize: 12
    },
    icon: {
        color: 'black'
    }
});