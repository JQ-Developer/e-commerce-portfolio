import React, { useEffect, lazy, Suspense } from "react";
import Spinner from "../../components/spinner/spinner.component";

import { Route } from "react-router-dom";

import { connect } from "react-redux";

//saga
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

//Lazy
const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
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
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
