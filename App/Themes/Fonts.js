/**
 * Created by jesseonolememen on 07/08/2017.
 */
const type = {
    base: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    medium: 'Poppins-Medium',
    emphasis: 'HelveticaNeue-Italic',
    thin: 'Poppins-Light'
};

const size = {
    h1: 28,
    h2: 34,
    h3: 30,
    h4: 26,
    h5: 20,
    h6: 17,
    input: 18,
    regular: 17,
    medium: 17,
    small: 12,
    tiny: 8.5,
    normalSmall: 14
};

const style = {
    h1: {
        fontFamily: type.base,
        fontSize: size.h1,
        backgroundColor: 'transparent',
    },
    h2: {
        fontWeight: 'bold',
        fontSize: size.h2,
        backgroundColor: 'transparent',
    },
    h3: {
        fontFamily: type.base,
        fontSize: size.h3,
        backgroundColor: 'transparent',
    },
    h4: {
        fontFamily: type.base,
        fontSize: size.h4,
        backgroundColor: 'transparent',
    },
    h5: {
        fontFamily: type.base,
        fontSize: size.h5,
        backgroundColor: 'transparent',
    },
    h6: {
        fontFamily: type.base,
        fontSize: size.h6,
        backgroundColor: 'transparent',
    },
    normal: {
        fontFamily: type.base,
        fontSize: size.regular,
        backgroundColor: 'transparent',
    },
    description: {
        fontFamily: type.base,
        fontSize: size.medium,
        backgroundColor: 'transparent',
    },
    medium: {
        fontFamily: type.medium,
        fontSize: size.medium,
        backgroundColor: 'transparent',
    },
    small: {
        fontFamily: type.thin,
        fontSize: size.small,
        backgroundColor: 'transparent',
    },
    normalSmall: {
        fontFamily: type.base,
        fontSize: size.normalSmall,
        backgroundColor: 'transparent',
    },
    navigation: {
        fontFamily: type.base,
        fontSize: size.medium,
    },
    rowHeader: {
        fontFamily: type.thin,
        fontSize: size.normalSmall,
        backgroundColor: 'transparent',
    }
};

export default {
    type,
    size,
    style
}
