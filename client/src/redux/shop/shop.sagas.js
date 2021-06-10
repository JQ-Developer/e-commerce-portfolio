//takeEvery(pattern, saga, ...args)#Spawns a saga on each action dispatched to the Store that matches pattern, además deja que el código se continue ejecutando cuando esta haciendo tareas que requieren de buscar informacion
//call es para llamar funciones, tecnicamente no es necesario pero es útil , y una buena práctica.
//put Creates an Effect description that instructs the middleware to dispatch an action to the Store, básicamente se usa para despachar acciones.

import { takeLatest, call, put, all } from "redux-saga/effects";

//Importando las utilidades necesarias desde firebase
import {
  firestore,
  convertCollectonsSnapshotToMap,
} from "../../firebase/firebase.utils";

//Importando las acciones
import {
  fetchCollectionsSucces,
  fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

//Esta es la funcion que se le pasa a la saga de abajo que está actuando con el efecto importado.
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");

    //yield espera a que se le mande la snapshot
    const snapshot = yield collectionRef.get();

    const collectionsMap = yield call(convertCollectonsSnapshotToMap, snapshot);

    yield put(fetchCollectionsSucces(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

//Esta saga inicia el fetching, toma el efecto takeEvery, que se dispara cada vez que se le pasa esta clase de accion, tambien se le pasa la saga que se ejecutará cuando eso ocurra,lo cambié a lates porque solo quiero que se propague una sola vez.
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
