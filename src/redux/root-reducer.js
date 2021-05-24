//The root-reducer represents the overall reducer base on all of the reducers that come in,
//in order to combine them all together we need to import the next method.
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
