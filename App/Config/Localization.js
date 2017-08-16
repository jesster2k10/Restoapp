/**
 * Created by jesseonolememen on 07/08/2017.
 */
import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
    en: {
        menu: 'Menu',
        details: 'Details',
        reviews: 'Reviews',
        description: 'Description',
        options: 'Options',
        favourite: 'Favourite',
        addToCart: 'Add To Cart',
        choseAnOption: 'Choose An Option',
        cancel: 'Cancel',
        successfullyAddedToCart: '{0} was successfully added to the cart',
        failedToAddToCart: 'Failed to add {0} to cart.',
        addedToCart: 'Added {0} to cart',
        cart: 'Cart',
        subtotal: 'Subtotal (excl. Delivery)',
        delivery: 'Delivery',
        payment: 'Payment',
        confirm: 'Confirm',
        checkout: 'Checkout',
        shippingAddress: 'Shipping Address',
        nextPaymentInfo: 'Next - Payment Info'.toUpperCase(),
        confirmPayment: 'Confirm Payment',
        enterFullName: 'Enter your full name',
        fullName: 'Full Name',
        enterAddress: 'Enter your street address',
        address: 'Address',
        city: 'City',
        enterCity: 'Enter your city',
        enterPostcode: 'Enter your post code',
        postcode: 'Postcode',
        enterState: 'Enter your county',
        state: 'County',
        payingWith: "Paying With".toUpperCase(),
        or: "or".toUpperCase()
    },
    "en-US": {
        enterState: 'Choose your state',
        state: 'State',
        enterPostcode: 'Enter your zip code',
        postcode: 'Zip Code',
    },
});

export default strings;