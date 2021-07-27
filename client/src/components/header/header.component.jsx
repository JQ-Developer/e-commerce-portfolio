//Ya no necesito importar Link aquí ya que lo estoy haciendo en el styled header, solo necesito pasarle los props necesarios, ejm el "to"

//import { Link } from "react-router-dom";

//Redux, trayendo los datos para el currentUser directo desde la base central, no de app.js, connect es un componente de orden superior.
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      {/* <OptionLink to="/shop">CONTACT</OptionLink> */}
      {currentUser ? (
        //auth.signOut es un metodo que provee auth
        <OptionLink as="div" onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

//connect es una funcion que toma dos argumentos, uno con el state que necesita el componente con el componente, para ello creo un afuncion que mapee las propiedades que necesita el componente y se la paso al metodo connect directamente desde el RootReducer.

//state => rootReducer, user.currentUser=> desde el userReducer

//EL nombre de la propiedad debe ser igual al prop que se le pasa al componente

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });
//Una forma más avanzada de destructuración
/*
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});
*/
/*
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state),
});
*/
//Sin embargo con la función createStructuredSelector

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
