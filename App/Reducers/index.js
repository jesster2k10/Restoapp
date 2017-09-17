/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { REHYDRATE } from 'redux-persist/constants'

import MealsReducer from './MealsReducer';
import MealReducer from './MealReducer';
import CartReducer from './CartReducer';
import CheckoutReducer from './CheckoutReducer';
import OrderReducer from './OrderReducer';
import AuthReducer from './AuthReducer';
import LoginFormReducer from './Forms/LoginFormReducer';
import RegistrationFormReducer from './Forms/RegistrationFormReducer';
import ShippingFormReducer from './Forms/ShippingFormReducer';
import NewsReducer from './NewsReducer';
import CategoryReducer from './CategoryReducer';
import UserReducer from './UserReducer';
import PhotosReducer from './PhotosReducer';
import FavouritesReducer from './FavouritesReducer';

export default combineReducers({
    auth: AuthReducer,
    meals: MealsReducer,
    meal: MealReducer,
    categories: CategoryReducer,
    news: NewsReducer,
    favourites: FavouritesReducer,
    photos: PhotosReducer,
    cart: CartReducer,
    user: UserReducer,
    checkout: CheckoutReducer,
    loginForm: LoginFormReducer,
    registrationForm: RegistrationFormReducer,
    shippingForm: ShippingFormReducer,
    reduxForms: formReducer.plugin({
        login: (state, { type }) => {
            switch (type) {
                case REHYDRATE:
                    return {...state};
                default:
                    return state;
            }
        }
    }),
    orders: OrderReducer
});