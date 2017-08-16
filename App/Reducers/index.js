/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { combineReducers } from 'redux';

import MenuReducer from './MenuReducer';
import MealsReducer from './MealsReducer';
import CartReducer from './CartReducer';
import CheckoutReducer from './CheckoutReducer';

export default combineReducers({
    menu: MenuReducer,
    meals: MealsReducer,
    cart: CartReducer,
    checkout: CheckoutReducer
});