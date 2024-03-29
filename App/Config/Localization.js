/**
 * Created by jesseonolememen on 07/08/2017.
 */
import LocalizedStrings from 'react-native-localization';
import Constants from '../Config/Constants';

let strings = new LocalizedStrings({
    en: {
        menu: 'Menu',
        details: 'Details',
        reviews: 'Reviews',
        description: 'Description',
        options: 'Options',
        favourite: 'Favourite',
        addToCart: 'Add To Cart',
        failedToResetCart: 'Failed to clear the cart',
        choseAnOption: 'Choose An Option',
        cancel: 'Cancel',
        confirm: 'Confirm',
        makeAReservation: 'Make a Reservation',
        successfullyAddedToCart: '{0} was successfully added to the cart',
        failedToAddToCart: 'Failed to add {0} to cart.',
        addedToCart: 'Added {0} to cart',
        favourited: 'Added {0} to favourites',
        favourites: 'Favourites',
        cart: 'Cart',
        isAddedToCart: 'Added to cart',
        removedFromCart: 'Removed meal from cart',
        subtotal: 'Subtotal',
        orderNote: 'Order Note',
        addOrderNote: 'Add an Order Note',
        delivery: 'Delivery',
        noFavs: 'You have no favourites',
        payment: 'Payment',
        checkout: 'Checkout',
        shippingAddress: 'Shipping Address',
        nextPaymentInfo: 'Next - Payment Info',
        confirmPayment: 'Confirm Payment',
        enterFullName: 'Enter your full name',
        fullName: 'Full Name',
        invalidName: `This isn't a name`,
        checkAgainForInvalidFields: 'Please check for invalid fields',
        invalidFields: 'Invalid Fields',
        enterEmail: 'Enter your email',
        email: 'Email Address',
        phone: 'Phone Number',
        enterPhone: 'Enter your phone',
        enterAddress: 'Enter your street address',
        address: 'Address',
        city: 'City',
        enterCity: 'Enter your city',
        enterPostcode: 'Enter your post code',
        postcode: 'Postcode',
        enterState: 'Enter your county',
        state: 'County',
        payingWith: "Paying With".toUpperCase(),
        or: "or".toUpperCase(),
        card: "Card",
        paypal: "PayPal",
        applePay: "Apple Pay",
        account: 'Account',
        chooseAnAccount: 'Choose An Account',
        androidPay: "Android Pay",
        continuePayment: "Continue Payment",
        payCompany: 'Pay {0}',
        selectCard: 'Select a Card',
        usePreviousMethod: 'Use a Previous Card',
        selectPaymentMethod: 'Select a Payment Method',
        required: '{0} is required',
        invalidEmail: `That's not an email`,
        weakPassword: 'This password is too weak',
        passwordTooShort: 'This password is too short',
        categories: 'Categories',
        orders: 'Orders',
        settings: 'Settings',
        logout: 'Log Out',
        emailSignup: 'Sign up with Email',
        googleSignup: 'Sign up with Google',
        facebookSignup: 'Sign up with Facebook',
        alreadyRegistered: 'Already registered?',
        notRegistered:'Not Registered?',
        seeMenu: 'See Menu',
        register: 'Register',
        login: 'Login',
        enterPassword: 'Enter your password',
        password: 'Password',
        agreeToTerms: 'By registering you are agreeing to our terms and conditions.',
        needHelp: 'Need Help?',
        forgotPassword: 'Forgot Password',
        forgotEmail: 'Forgot Email',
        other: 'Other',
        needHelpTitle: 'How would you like to get help?',
        invalidPhone: `This isn't a phone`,
        invalidAddress: `No special characters allowed.`,
        country: 'Country',
        enterCountry: 'Enter your country',
        invalidCountry: `This isn't a country`,
        news: 'News',
        unknown: 'Unknown',
        nothing: 'You have no {0}.',
        ordersLowercase: 'orders',
        loginNothing: 'Login or create an account to see your {0}',
        photos: 'Photos',
        info: 'Information',
        links: 'Links',
        about: 'About Us',
        website: 'Website',
        facebook: 'Facebook',
        twitter: 'Twitter',
        snapchat: 'Snapchat',
        google: 'Google',
        location: 'Location',
        ok: 'Ok',
        clearCart: 'Clear Cart?',
        confirmClearCart: 'Are you sure that you want to clear your cart?',
        emptyCart: 'Your cart is empty',
        noReviews: 'There are no reviews',
        addOne: 'Add a review',
        loginToContinue: 'Please login to continue',
        reservation: "Reservations",
        unauthorized: 'Unauthorized',
        receipt: 'Receipt',
        contactSupport: 'Contact Support',
        chooseContactMethod: 'Please choose a contact method below.',
        emailSupport: 'Email Support',
        callSupport: 'Call Support',
        signInRequired: 'Sign In Required',
        pleaseSignIn: 'Please Sign In to Continue',
        useSavedAddress: 'Use a saved address',
        selectAddress: 'Select an Address',
        noSavedAddresses: 'You have no saved addresses',
        chooseDeliveryType: 'Choose Delivery Type',
        deliveryOrCollection: 'Delivery or Collection',
        selectDeliveryType: 'Select Delivery Type',
        collection: 'Collection',
        haveThisOrderDelivered: 'Have this order delivered to you.',
        collectThisOrder: 'Collect this order from our store.',
        orderOnTheWay: 'Your Order is On The Way',
        orderBeingPrepared: 'Your Order is Being Prepared',
        mealReadyIn: 'Your meal(s) should arrive within the next:',
        validatingAddress: 'Validating Address',
        collectMealIn: 'Your meal(s) should be ready for collection within the next:',
        finish: 'Finish',
        makingPayment: 'Processing Payment',
        creatingOrder: 'Creating Order',
        minutes: 'minute(s)',
        galleries: 'Galleries',
        openingTimes: 'Opening Hours',
        mondayToFriday: 'Monday to Friday',
        cash: 'Cash',
        payWithCash: 'Pay With Cash',
        doneAddingExtras: 'Done adding Extras',
        checkForErrors: 'Check for errors',
        payWithCashMessage: 'You will have to pay in person when the meal is delivered/collected',
        minOrderAlertText: `You must spend at least {0}${Constants.MIN_ORDER_AMOUNT}`
    },
    "en-US": {
        enterState: 'Choose your state',
        state: 'State',
        enterPostcode: 'Enter your zip code',
        postcode: 'Zip Code',
    },
});

export default strings;