import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//React redux
import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopage/shop.component";
import SignInSignUpPage from "./pages/sign-in-up/sign-in-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

//Importando la accion
import { setCurrentUser } from "./redux/user/user.actions";

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
    const { setCurrentUser } = this.props;

    //Este metodo es un observador el cual recibe informacion de firebase, diciendole si el usuario tiene la secion iniciada
    //

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Este metodo me dice si se ha actualizado la base de datos del documento referencia, normalmente no se actualiz pero me da un snapshot que puedo añadir a mi estado de usuario this.state.currentUser
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

          //console.log(this.state);
        });
      } else {
        //this.setState({ currentUser: userAuth });
        setCurrentUser(userAuth);
      }

      //createUserProfileDocument(user);

      //this.setState({ currentUser: user });
      //console.log(user);
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
          <Route path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

//El segundo argumento de connect es MapdispatchToProps
const mapdispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapdispatchToProps)(App);

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
//? Para instalar sass a un proyecto yarn add node-sass

//? React tiene un atributo llamado "style={ {} }" el cual tiene un objeto en el cual se pueden poner reglas de css con las que se puede modificar el elemento en el que se invoca

//? Se le pueden añadir mas de una clase a los elemtos, usando la siguiente notacion className = {`primera clase segunda clase ${javaScript pasado en props}`}

//? React router tiene la funcion "Route" la cual toma tres argumentos "component" que es el comoponente que queremos renderizar, "path" es la direccion que debe tener esa pagina. "exact" puede ser true or false, por defecto es true, el cual carga la pagina solo si la direccion en el path es identica a la del navegador.
//? Tambien tiene el metodo "Switch" el cual reenderiza la primera pagina que matchee con el path si no cargara nada más
//? Reacr Router toma como props una serie de parametros que pueden ser ùtiles, tales como isExact(que dice si se esta cumpliento la url exactamente) path, url, params, etc
//? Router tambien nos da acceso a importar el metodo "Link", el cual nos permite creal un lik hacia otra direcction url.
//? Otra manera de hacer esto es mediante un boton, usando la api "history" de la siguiente manera
//* button onclick={()=> props.history.push('/topics')}> Topics</button>
//? Location nos da la direccion de donde estamos

//?Solamente el elemento que se le pone a Router tiene acceso a esa propiedades por lo tanto si quiero obtenerlas debo hacerlas de la manera correcta, no haciendo un tunel entre los componentes(prop drilling).
//? Imortando "withRouter" nos da acceso a una funcion de orden superior que toma como argumento un componente y le da acceso a los props de los que estuve hablando arriba.
//?You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

//? Para importar un SVG se usa la palabra "ReactComponent" de la siguinete manera:
//* import {ReactComponent as Logo} from ...

//! Firebase
//? Es una base de datos no-sql
//? Para hacer un crud con inicio de sesion con google hay que escribir codigo pero también hay que configurarlo en firestone autenticación
//? Las bases de datos en firebase básicamente consisten en colecciones y documentos
//? La manera de query them es aspi
//* firebase.firestore().collection('users').doc('idcode').collection(cartItems).doc('idCode')
//? otra manera es
//*firestore().doc('users/idcode/cartItems/idCode')
//Si lo que busco es una collection entoces debo poner collection.
//? Un query es básicamente pedir por un dato en la database, lo de arriba es un query
//? Firebase nos puede regresar dos tipos de objetos, un QueryReference: que no nos da la data verdadera sino las propiedades que nos dicen los tellades sobre ello.
//? Hay maneras de pedir por esta referencia, ver el pdf de la leccion 13.1/carp 7, pero los crud se hacen desde la referencia del documento, para todo lo CRUD se usa el documenRef object.

//! Redux
//? redux es una libreria que hace es manejo del state mucho más fácil y ordenado.
//?Es bueno para el manejo de states muy grandes, cuando la aplicacion se vuelve muy grande
//? Util para compartir data entre componentes
//?Tiene tres principoios fundamentales
//*1)Una sola fuente de verdad (básicamente un solo objeto inmenso donde se almacena todo el state de la aplicación)
//*2) El estado solo es para leer, es inmutable
//*3) Cambios solo usando funciones puras.

//?El flujo de redux es : actions ==> root reducer ==> store ==> DOM changes

//? Las acciones pueden ser cualquier interaccion con la pagina
//? Los reducer son observadores, funciones qeu toman un estado y una accion, que dependiendo de cual sea se pasará al store para que actualice el dom

//? pasos, alamceno todo en el elemento provider, en el index.js, escribo el root-reducer, escribo el reducer y los combino en el rootreducer, estore estando alli seteo los middleware e importo el root-reducer. Una vez hecho eso debo exportar el store y pasarselo a provider, en el index.js. Ahora creo la accion que es la que disparará el reducer, son acciones que regresan objects.
//? Luego de hacer eso en el componente que le quiero pasar los datos importo la funcion connect y meto en componente alli y lo exporto
//?Ahora para pasar los datos importo connect a app.js, pero esta vez uso el segundo argumento del metodo, y el primer argumento lo pongo nulo.
