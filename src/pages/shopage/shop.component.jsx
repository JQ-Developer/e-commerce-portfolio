import React from "react";
//import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";
//import SHOP_DATA from "./shop.data";

//import CollectionPreview from "../../components/collection-preview/collection-preview.component";

//import { selectCollections } from "../../redux/shop/shop.selector";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = ({ collections }) => (
  /*
  constructor(props) {
    super(props);

    this.state = {
      collection: SHOP_DATA,
    };
  }
  */

  <div className="shop-page">
    <CollectionsOverview />
  </div>
);

export default ShopPage;
