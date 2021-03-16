/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for all react reducers, reducers
             manage the states of the application.
 */

//class objects
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import authReducer from './auth.reducers';
import userReducer from './user.reducer';
import { combineReducers } from 'redux';

//This variable combines all the reducers into one root reducer object.
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    product: productReducer,
    category: categoryReducer
})

export default rootReducer;