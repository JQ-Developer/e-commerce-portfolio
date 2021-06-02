import React from "react";

import { Route } from "react-router-dom";

import { connect } from "react-redux";

//import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";
//import SHOP_DATA from "./shop.data";

//import CollectionPreview from "../../components/collection-preview/collection-preview.component";

//import { selectCollections } from "../../redux/shop/shop.selector";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import CollectionPage from "../collection/collection.component";

//firestore
import {
  firestore,
  convertCollectonsSnapshotToMap,
} from "../../firebase/firebase.utils";

//Action
import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

//Como shopage esta siendo llamada desde App.js con router eso le da acceso a match history etc

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  /*
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }
  */

  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

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
    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectonsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
