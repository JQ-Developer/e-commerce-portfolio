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

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    /*
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    */
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
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

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

//El segundo argumento de connect es MapdispatchToProps, lo que hace es pasar las acciones al prop de la clase app, así que ahora tendrá como prop la funcion setCurrentUser, que es la acción

export default connect(mapStateToProps, mapDispatchToProps)(App);
