/**
 * Created by jesseonolememen on 03/09/2017.
 */
export const isMealInCart = ({ _id }, { products }) => {
    if (products) return products.findIndex(item => item._id === _id) != -1;

    return false
};