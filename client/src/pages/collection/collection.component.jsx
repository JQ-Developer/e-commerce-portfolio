import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selector";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItmesContainer,
} from "./collection.styles";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  return (
    <CollectionPageContainer>
      <CollectionTitle className="title">{title}</CollectionTitle>
      <CollectionItmesContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItmesContainer>
    </CollectionPageContainer>
  );
};

//La funcion mapStateToProps toma dos argumentos, el primero es el parametro y el segundo es el de los props del componentes que le estoy pasando al connect, y toma dos argumentos uno son los props y el otro es el state que es llamado desde la funcion de adentro del selector
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
