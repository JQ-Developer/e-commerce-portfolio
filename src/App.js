import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

//React redux
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

//Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopage/shop.component";
import SignInSignUpPage from "./pages/sign-in-up/sign-in-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import {
  auth,
  createUserProfileDocument,
  /*addCollectionAndDocuments,*/
} from "./firebase/firebase.utils";

//Importando la accion
import { setCurrentUser } from "./redux/user/user.actions";

//Importando selectors
import { selectCurrentUser } from "./redux/user/user.selectors";
//import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends React.Component {
  /*
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  */
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser /*collectionsArray*/ } = this.props;

    //Este metodo es un observador el cual recibe informacion de firebase, diciendole si el usuario tiene la sesion iniciada
    //

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Este metodo me dice si se ha actualizado la base de datos del documento referencia, normalmente no se actualiza pero me da un snapshot que puedo añadir a mi estado de usuario this.state.currentUser, también me manda un snapshot del momento en el que se crea la app, cuando carga por pñrimera vez, y nos regresa ese snapshot
        userRef.onSnapshot((snapShot) => {
          //los snapshots tienen un metodo llamado data, que de da un objeto con las propiedades que yo definí para el mismo, sin embargo no me da el id
          /*
          this.setState({
            currentUser: { id: snapShot.id, ...snapShot.data() },
          });
          */

          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        //this.setState({ currentUser: userAuth });
        setCurrentUser(userAuth);
      }

      /*addCollectionAndDocuments(
        "collections",
        collectionsArray.map(({ title, items }) => ({ title, items }))
      );*/
      //createUserProfileDocument(user);

      //this.setState({ currentUser: user });
      //console.log(this.props);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header /*currentUser={this.state.currentUser}*/ />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//Esto trae el objeto del userReducer
/*
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  /*collectionsArray: selectCollectionsForPreview,*/
});

//El segundo argumento de connect es MapdispatchToProps, lo que hace es pasar las acciones al prop de la clase app, así que ahora tendrá como prop la funcion setCurrentUser, que es la acción
const mapdispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapdispatchToProps)(App);
