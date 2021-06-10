import { createStore, applyMiddleware } from "redux";
//Persist store para guardar el state general en el navegador
import { persistStore } from "redux-persist";
//Esto es para loggear cada una de las acciones cuando pasan por el middleware, sirve para debuggear.
import logger from "redux-logger";
//Importando createSaga para pasar las sagas al store, como un middleware, estoy reemplazando el thunk
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

import rootReducer from "./root-reducer";

//saga
const sagaMiddleware = createSagaMiddleware();
//

//Setting the middleware
const middlewares = [sagaMiddleware];

//esta variable puede ser development , production o test, cuando sehace yarn buid cambia el servidor a production
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
//

// El middleware que store espera es un array, por eso lo paso a un array, la info que arroje logger.

//Ahora para crear la store debo llamar esta funcion que cree el store y tiene como argumentos el rootReducer y los middleware (array)

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

//saga

//Para llamar la persistStore debo exportar la store y luego declarar lo siguiente
//No necesariamente debo exportar el valor de arriba y el de abajo OJO
export const persistor = persistStore(store);

export default { store, persistor };
