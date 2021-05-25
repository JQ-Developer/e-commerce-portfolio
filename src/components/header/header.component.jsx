import { Link } from "react-router-dom";

//Redux, trayendo los datos para el currentUser directo desde la base central, no de app.js, connect es un componente de orden superior.
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        //auth.signOut es un metodo que provee auth
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

//connect es una funcion que toma dos argumentos, uno con el state que necesita el componente con el componente, para ello creo un afuncion que mapee las propiedades que necesita el componente y se la paso al metodo connect directamente desde el RootReducer.

//state => rootReducer, user.currentUser=> desde el userReducer

//EL nombre de la propiedad debe ser igual al prop que se le pasa al componente

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });
//Una forma más avanzada de destructuración
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
