import { createStore, applyMiddleware } from "redux";

//Esto es para loggear cada una de las acciones cuando pasan por el middleware, sirve para debuggear.
import logger from "redux-logger";

import rootReducer from "./root-reducer";

//Setting the middleware
const middlewares = [logger];
//

// El middleware que store espera es un array, por eso lo paso a un array, la info que arroje logger.

//Ahora para crear la store debo llamar esta funcion que cre el store y tiene como argumentos el rootReducer y los middleware (array)

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
