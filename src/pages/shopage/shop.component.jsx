import React from "react";

import { Route } from "react-router-dom";

import { connect } from "react-redux";

//Action
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selector";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

import CollectionPageContainer from "../collection/collection.container";

//Como shopage esta siendo llamada desde App.js con router eso le da acceso a match history etc

class ShopPage extends React.Component {
  componentDidMount() {
    //Comentando esta parte para probar como sería con una API normal, usando promesas.
    /*
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectonsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
    */
    //Ahora que estoy usando redux-thunk ya no es necesario este codigo aqui, así que la version de promesas la pasé al shop.actions.js.

    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          /*
          Esto es para cuando no estamos usando el patron container para elementos de alto orden
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
          */
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          /*
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!selectIsCollectionsLoaded}
              {...props}
              */
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
