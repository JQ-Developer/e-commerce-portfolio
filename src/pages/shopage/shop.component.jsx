import React from "react";

import { Route } from "react-router-dom";

//import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";
//import SHOP_DATA from "./shop.data";

//import CollectionPreview from "../../components/collection-preview/collection-preview.component";

//import { selectCollections } from "../../redux/shop/shop.selector";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import CollectionPage from "../collection/collection.component";

//Como shopage esta siendo llamada desde App.js con router eso le da acceso a match history etc
const ShopPage = ({ match }) => (
  /*
  constructor(props) {
    super(props);

    this.state = {
      collection: SHOP_DATA,
    };
  }
  */

  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />

    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
