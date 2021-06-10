import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//Esta funcion convierte los datos de data-shop de nuevo en un array, porque el metodo de arriba aún sigue pensando que es un array, cuando lo acabo de convertir en un objeto.Pero ya no es un objeto desde que lo normalice, así que por eso debo actualizar el flujo de datod dentro de la aplicacion.
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

//Este selector lo que hace es encontrar la collection que queremos dentro de las collections basandose en la url del paramatro que le introduciomos y encontrandolo mediante el mapa de arriba
//Básicamente estamos haciendo currying

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

//
//Lo que voy a hacer es comentar este mapeo ya que es más sendillo convertir el array de shop-data en un objeto al que se le asigna un id por cada collection y de ahí lo encontramos basandonos en el matchUrl. Así que ya no tengo que usar el mapa de arriba kekaso
//A esto se le llama normalization of data
/*
    collections.find(
      (collections) => collections.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
    */
//

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
