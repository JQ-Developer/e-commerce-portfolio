import ShopActionsTypes from "./shop.types";

import {
  firestore,
  convertCollectonsSnapshotToMap,
} from "../../firebase/firebase.utils";

/*
export const updateCollections = (collectionsMap) => ({
  type: ShopActionsTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
*/

export const fetchCollectionsStart = () => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSucces = (collectionsMap) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCES,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

//THUNK, que me permite despachar funciones en lugar de solo acciones, que son objetos, y así añadirle más lógica al código. Básicamente una funcion que regresa una función que puede acceder al Dispatch.
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    console.log(collectionRef.get());
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectonsSnapshotToMap(snapshot);

        dispatch(fetchCollectionsSucces(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
