import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
//Esto sirve para currificar todas las funcines de un componente
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

//const CollectionsOverviewContainer = connect(mapStateToProps)(
//WithSpinner(CollectionsOverview)
//);

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
