/**
 * Created by jesseonolememen on 07/08/2017.
 */
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colours from './Colours'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    screen: {
        mainContainer: {
            flex: 1,
            backgroundColor: Colours.lightBody
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        container: {
            flex: 1,
            paddingTop: Metrics.baseMargin,
            backgroundColor: Colours.lightBody
        },
        section: {
            margin: Metrics.section,
            padding: Metrics.baseMargin
        },
        sectionText: {
            ...Fonts.style.normal,
            paddingVertical: Metrics.doubleBaseMargin,
            color: Colours.snow,
            marginVertical: Metrics.smallMargin,
            textAlign: 'center'
        },
        subtitle: {
            color: Colours.snow,
            padding: Metrics.smallMargin,
            marginBottom: Metrics.smallMargin,
            marginHorizontal: Metrics.smallMargin
        },
        titleText: {
            ...Fonts.style.h2,
            fontSize: 14,
            color: Colours.text
        }
    },
    darkLabelContainer: {
        padding: Metrics.smallMargin,
        paddingBottom: Metrics.doubleBaseMargin,
        borderBottomColor: Colours.border,
        borderBottomWidth: 1,
        marginBottom: Metrics.baseMargin
    },
    darkLabel: {
        fontFamily: Fonts.type.bold,
        color: Colours.snow
    },
    groupContainer: {
        margin: Metrics.smallMargin,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sectionTitle: {
        ...Fonts.style.h4,
        color: Colours.coal,
        backgroundColor: Colours.ricePaper,
        padding: Metrics.smallMargin,
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
        borderWidth: 1,
        borderColor: Colours.ember,
        alignItems: 'center',
        textAlign: 'center'
    },
    position: {
        end: {
            justifyContent: 'flex-end'
        }
    }
};

export default ApplicationStyles
