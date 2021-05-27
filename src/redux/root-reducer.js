//The root-reducer represents the overall reducer base on all of the reducers that come in,
//in order to combine them all together we need to import the next method.
import { combineReducers } from "redux";

//Esto le dice a redux que quiero guardar los datos en el locarStorage
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Importando los reducers
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

//Estas son las configuraciones que requiero para el json
const persistConfig = {
  //Esta es la key
  key: "root",

  //Este es el storage que importamos
  storage,

  //Esta propiedad es un array con las strings de los reducers que nos interesa persist, no pogo el usuario porque ese es traido por default por FIREBASE
  whitelist: ["cart"],
};

//Ahora declaramos cual es el rootReducer para psarselos al persistReducer con la configuaracion que hicimos arriba

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);

/*
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
*/
