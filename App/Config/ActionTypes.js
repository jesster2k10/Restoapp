/**
 * Created by jesseonolememen on 07/08/2017.
 */
/**** Categories ****/
export const SELECT_CATEGORY = 'select_category';
export const ADD_CATEGORY = 'add_category';
export const GET_CATEGORIES_SUCCESS = 'get_categories_success';
export const GET_CATEGORIES_FAILED = 'get_categories_failed';
export const GET_CATEGORIES = 'get_categories';
export const GET_CATEGORY_MEALS = 'get_category_meals';
export const GET_CATEGORY_MEALS_SUCCESS = 'get_category_meals_success';
export const GET_CATEGORY_MEALS_FAILED = 'get_category_meals_failed';

/**** USER *****/
export const GET_CURRENT_USER = 'GET_CURRENT_USER'.toLowerCase();
export const GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED'.toLowerCase();
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS'.toLowerCase();
export const ADD_ADDRESS = 'ADD_ADDRESS'.toLowerCase();
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS'.toLowerCase();
export const ADD_ADDRESS_FAILED = 'ADD_ADDRESS_FAILED'.toLowerCase();
export const GET_ADDRESSES = 'GET_ADDRESSES'.toLowerCase();
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS'.toLowerCase();
export const GET_ADDRESSES_FAILED = 'GET_ADDRESSES_FAILED'.toLowerCase();
export const SELECT_ADDRESS = 'SELECT_ADDRESS'.toLowerCase();
export const RESET_SELECT_ADDRESS_DONE = 'RESET_SELECT_ADDRESS_DONE'.toLowerCase();

/**** REVIEWS *****/
export const GET_REVIEWS = 'GET_REVIEWS'.toLowerCase();
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS'.toLowerCase();
export const GET_REVIEWS_FAILED = 'GET_REVIEWS_FAILED'.toLowerCase();

/**** NEWS *****/
export const GET_NEWS = 'GET_NEWS'.toLowerCase();
export const GET_NEWS_FAILED = 'GET_NEWS_FAILED'.toLowerCase();
export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS'.toLowerCase();
export const GET_NEWS_CATEGORIES = 'GET_NEWS_CATEGORIES'.toLowerCase();
export const GET_NEWS_CATEGORIES_FAILED = 'GET_NEWS_CATEGORIES_FAILED'.toLowerCase();
export const GET_NEWS_CATEGORIES_SUCCESS = 'GET_NEWS_CATEGORIES_SUCCESS'.toLowerCase();

/**** Photos *****/
export const GET_ALL_PHOTOS = 'GET_ALL_PHOTOS'.toLowerCase();
export const GET_ALL_PHOTOS_FAILED = 'GET_ALL_PHOTOS_FAILED'.toLowerCase();
export const GET_ALL_PHOTOS_SUCCESS = 'GET_ALL_PHOTOS_SUCCESS'.toLowerCase();
export const GET_ALL_GALLERIES = 'GET_ALL_GALLERIES'.toLowerCase();
export const GET_ALL_GALLERIES_SUCCESS = 'GET_ALL_GALLERIES_SUCCESS '.toLowerCase();
export const GET_ALL_GALLERIES_FAILED = 'GET_ALL_GALLERIES_FAILED'.toLowerCase();

/**** AUTH *****/
export const FACEBOOK_SIGN_IN = 'facebook_sign_in';
export const FACEBOOK_SIGN_IN_SUCCESS = 'facebook_sign_in_success';
export const FACEBOOK_SIGN_IN_FAILED = 'facebook_sign_in_failed';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'.toLowerCase();
export const LOGIN_FAILED = 'LOGIN_FAILED'.toLowerCase();
export const REGISTER = 'REGISTER'.toLowerCase();
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'.toLowerCase();
export const REGISTER_FAILED = 'REGISTER_FAILED'.toLowerCase();
export const GOOGLE_SIGN_IN = 'google_sign_in';
export const GOOGLE_SIGN_IN_SUCCESS = 'google_sign_in_success';
export const GOOGLE_SIGN_IN_FAILED = 'google_sign_in_failed';
export const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN'.toLowerCase();
export const LOG_OUT = 'LOG_OUT'.toLowerCase();
export const LOG_OUT_FAILED = 'LOG_OUT_FAILED'.toLowerCase();
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'.toLowerCase();
export const CHANGE_EMAIL = 'CHANGE_EMAIL'.toLowerCase();
export const CHANGE_EMAIL_FAILED = 'CHANGE_EMAIL_FAILED'.toLowerCase();
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'.toLowerCase();
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED'.toLowerCase();
export const CHANGE_NAME = 'CHANGE_NAME'.toLowerCase();
export const CHANGE_NAME_FAILED = 'CHANGE_NAME_FAILED'.toLowerCase();

/**** MEAL *****/
export const MEAL_GET_OPTIONS = 'meal_get_options';
export const MEAL_HAS_OPTIONS = 'meal_has_options';
export const MEAL_GET_TAX = 'meal_get_tax';
export const MEAL_GET_IMAGES = 'meal_get_images';
export const GET_ALL_MEALS = 'GET_ALL_MEALS'.toLowerCase();
export const GET_ALL_MEALS_FAILED = 'GET_ALL_MEALS_FAILED'.toLowerCase();
export const GET_ALL_MEALS_SUCCESS = 'GET_ALL_MEALS_SUCCESS'.toLowerCase();
export const ADD_MEAL_REVIEW_SUCCESS = 'ADD_MEAL_REVIEW_SUCCESS'.toLowerCase();
export const ADD_MEAL_REVIEW_FAILED = 'ADD_MEAL_REVIEW_FAILED'.toLowerCase();
export const ADD_MEAL_REVIEW = 'ADD_MEAL_REVIEW'.toLowerCase();

/**** CART *****/
export const ADD_MEAL_TO_CART = 'add_meal_to_cart';
export const ADD_MEAL_TO_CART_SUCCESS = 'add_meal_to_cart_success';
export const ADD_MEAL_TO_CART_FAILED = 'add_meal_to_cart_failed';
export const CREATE_CART = 'create_cart';
export const CREATE_CART_SUCCESS = 'create_cart_success';
export const CREATE_CART_FAILED = 'create_cart_failed';
export const REMOVE_MEAL_FROM_CART = 'remove_meal_from_cart';
export const REMOVE_MEAL_FROM_CART_SUCCESS = 'remove_meal_from_cart_success';
export const REMOVE_MEAL_FROM_CART_FAILED = 'remove_meal_from_cart_failed';
export const GET_CART = 'get_cart';
export const GET_CART_SUCCESS = 'get_cart_success';
export const GET_CART_FAILED = 'get_cart_failed';
export const GET_SAVED_CART = 'get_saved_cart';
export const GET_SAVED_CART_SUCCESS = 'get_saved_cart_success';
export const GET_SAVED_CART_FAILED = 'get_saved_cart_failed';
export const RESET_CART = 'reset_cart';
export const RESET_CART_FAILED = 'RESET_CART_FAILED'.toLowerCase();
export const RESET_CART_SUCCESS = 'RESET_CART_SUCCESS'.toLowerCase();
export const CLEAR_RESET_ERRORS = 'CLEAR_RESET_ERRORS'.toLowerCase();
export const CLEAR_REMOVE_ERRORS = 'CLEAR_REMOVE_ERRORS'.toLowerCase();
export const CLEAR_ADD_ERRORS = 'CLEAR_ADD_ERRORS'.toLowerCase();
export const CLEAR_MEAL_ERRORS = 'CLEAR_MEAL_ERRORS'.toLowerCase();

/**** ORDERS ******/
export const GET_ORDERS = 'GET_ORDERS'.toLowerCase();
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'.toLowerCase();
export const GET_ORDERS_FAILED  = 'GET_ORDERS_FAILED'.toLowerCase();

/**** CHECKOUT *****/
export const SET_SELECTED_PAYMENT_TYPE = 'SET_SELECTED_PAYMENT_TYPE'.toLowerCase();
export const CHECKOUT_CHANGE_PAGE = 'CHECKOUT_CHANGE_PAGE'.toLowerCase();
export const SET_CARD_NUMBER_TINT_COLOR = 'SET_CARD_NUMBER_TINT_COLOR'.toLowerCase();
export const SET_CCV_TINT_COLOR = 'SET_CCV_TINT_COLOR'.toLowerCase();
export const SET_EXPIRY_TINT_COLOR = 'SET_EXPIRY_TINT_COLOR'.toLowerCase();
export const CONFIRM_PAYMENT = 'CONFIRM_PAYMENT'.toLowerCase();
export const CONFIRM_SHIPPING = 'CONFIRM_SHIPPING'.toLowerCase();

/***** PAYMENTS *****/
export const MAKE_PAYMENT               = 'MAKE_PAYMENT'.toLowerCase();
export const MAKE_PAYMENT_SUCCESS       = 'MAKE_PAYMENT_SUCCESS'.toLowerCase();
export const MAKE_PAYMENT_FAILED        = 'MAKE_PAYMENT_FAILED'.toLowerCase();

export const CREATE_CUSTOMER            = 'CREATE_CUSTOMER'.toLowerCase();
export const CREATE_CUSTOMER_SUCCESS    = 'CREATE_CUSTOMER_SUCCESS'.toLowerCase();
export const CREATE_CUSTOMER_FAILED     = 'CREATE_CUSTOMER_FAILED'.toLowerCase();

export const CHARGE_CUSTOMER            = 'CHARGE_CUSTOMER'.toLowerCase();
export const CHARGE_CUSTOMER_SUCCESS    = 'CHARGE_CUSTOMER_SUCCESS'.toLowerCase();
export const CHARGE_CUSTOMER_FAILED     = 'CHARGE_CUSTOMER_FAILED'.toLowerCase();

export const GET_PAYMENT_CARDS          = 'GET_PAYMENT_CARDS'.toLowerCase();
export const GET_PAYMENT_CARDS_SUCCESS  = 'GET_PAYMENT_CARDS_SUCCESS'.toLowerCase();
export const GET_PAYMENT_CARDS_FAILED   = 'GET_PAYMENT_CARDS_FAILED'.toLowerCase();

export const GET_SAVED_CUSTOMER_ID      = 'GET_SAVED_CUSTOMER_ID'.toLowerCase();
export const GET_SAVED_CUSTOMER_ID_FAILED   = 'GET_SAVED_CUSTOMER_ID_FAILED'.toLowerCase();
export const GET_SAVED_CUSTOMER_ID_SUCCESS   = 'GET_SAVED_CUSTOMER_ID_SUCCESS'.toLowerCase();

/***** FORMS ****/
export const CHANGE_PHONE = 'CHANGE_PHONE'.toLowerCase();
export const CHANGE_PHONE_FAILED = 'CHANGE_PHONE_FAILED'.toLowerCase();
export const CHANGE_ZIP = 'CHANGE_ZIP'.toLowerCase();
export const CHANGE_ZIP_FAILED = 'CHANGE_ZIP_FAILED'.toLowerCase();
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS'.toLowerCase();
export const CHANGE_ADDRESS_FAILED = 'CHANGE_ADDRESS_FAILED'.toLowerCase();
export const CHANGE_CITY = 'CHANGE_CITY'.toLowerCase();
export const CHANGE_STATE = 'CHANGE_STATE'.toLowerCase();
export const CHANGE_COUNTRY = 'CHANGE_COUNTRY'.toLowerCase();
export const CHANGE_COUNTRY_FAILED = 'CHANGE_COUNTRY_FAILED'.toLowerCase();

/***** FAVOURITES *****/
export const FAVOURITE_MEAL = 'FAVOURITE_MEAL'.toLowerCase();
export const FAVOURITE_MEAL_FAILED = 'FAVOURITE_MEAL_FAILED'.toLowerCase();
export const FAVOURITE_MEAL_SUCCESS = 'FAVOURITE_MEAL_SUCCESS'.toLowerCase();
export const GET_ALL_FAVOURITES = 'GET_ALL_FAVOURITES'.toLowerCase();
export const GET_ALL_FAVOURITES_FAILED = 'GET_ALL_FAVOURITES_FAILED'.toLowerCase();
export const GET_ALL_FAVOURITES_SUCCESS = 'GET_ALL_FAVOURITES_SUCCESS'.toLowerCase();
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'.toLowerCase();
export const REMOVE_FAVOURITE_FAILED = 'REMOVE_FAVOURITE_FAILED'.toLowerCase();
export const REMOVE_FAVOURITE_SUCCESS = 'REMOVE_FAVOURITE_SUCCESS'.toLowerCase();

/****** RESERVATIONS ****/
export const GET_TABLES_SUCCESS = 'GET_TABLES_SUCCESS'.toLocaleLowerCase();