import {
    StyleSheet
} from 'react-native';
import {
    ApplicationStyles,
    Colours,
    Metrics,
    Fonts
} from '../../Themes';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        paddingBottom: 0,
        marginBottom: 0,
        margin: 0,
        padding: 0,
        bottom: 0,
    },
    row: {
        padding: 20,
        height: 60,
        backgroundColor: Colours.lighterBody,
        borderLeftWidth: 0,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    header: {
        flex: 0,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    column: {
        flexDirection: 'column'
    },
    detailContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
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
        marginRight: 5,
        width: 50,
        height: 30
    },
    paymentIcon: {
        flex: 1,
    },
    paymentButtonContainer: {
        flex: 0.2,
        alignItems: 'flex-start'
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
    price: {
        ...Fonts.style.normalSmall,
        fontFamily: Fonts.type.medium,
        color: Colours.ribbon.background
    },
    total: {
        ...Fonts.style.h5,
        color: Colours.mainTextColor
    },
    bottomContainer: {
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'flex-end'
    }
});