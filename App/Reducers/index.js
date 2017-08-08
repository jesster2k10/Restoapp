/**
 * Created by jesseonolememen on 07/08/2017.
 */
import { combineReducers } from 'redux';

import MenuReducer from './MenuReducer';

export default combineReducers({
    menu: MenuReducer,
});