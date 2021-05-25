import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import "./collection-item.styles.scss";

//Importing the action
import { addItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ id, item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        ADD TO CART
      </CustomButton>
    </div>
  );
};

//Esta funcion devuleve un objeto que lo que hace es tomar un item y pasarselo a la accion que luego será evluada en el redux y si todo es correcto se despacha al store, para que el componente se actualice
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
