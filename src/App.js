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

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

//Importando la accion
import { setCurrentUser } from "./redux/user/user.actions";

//Importando selectors
import { selectCurrentUser } from "./redux/user/user.selectors";

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

    //Este metodo es un observador el cual recibe informacion de firebase, diciendole si el usuario tiene la sesion iniciada
    //

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Este metodo me dice si se ha actualizado la base de datos del documento referencia, normalmente no se actualiza pero me da un snapshot que puedo añadir a mi estado de usuario this.state.currentUser
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
});

//El segundo argumento de connect es MapdispatchToProps, lo que hace es pasar las acciones al prop de la clase app, así que ahora tendrá como prop la funcion setCurrentUser, que es la acción
const mapdispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapdispatchToProps)(App);

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
//? si no se especifica el segundo argumento a connect el asumirá que es la función (dispatch), y la pasará al state, por lo tanto si solo necesito importar una accion puedo usar lo de esa manera
//*componente({dispatch}){}
//*onClick={()=> dispatch(toggleCartHidden())}

//*SELECTORS A “selector” is simply a function that accepts Redux state as an argument and returns data that is derived from that state. Por lo tanto, como computan nueva data que pasan al componente este simepre se render de nuevo, lo que no es bueno para la optimizacion de la aplicacion.

//? RESELECTORS para que poder usar el mapStateToProps en varios componentes usamos una libreria llamada "reselect", la cual tiene el método CreateSelector, hace que los selectors no reendericen el componente cada vez que se actualiza el estate y el valor de estos no cambia.

//? También tiene el método "createStructuredSelector" el cual usado dentro de una función "mapStateToProps" le pasa automáticamente el estate al cada selector.
//*const mapStateToProps = createStructuredSelector({
//*  currentUser: selectCurrentUser,
//*  hidden: selectCartHidden,
//*});

//? Usar reselect es una buena práctica y es la manera más común de trabajar cuando se usa React Redux

//! REDUX PERSIST
//? Redux persist es una libreria que me permite guardar el Redux en el local storage sin tanto problema, para instalarla solo pongo en el terminal "yarn add redux-persist" y la instalo en donde esta el storage
//? Para usarlo decalro en el store que requiero usarlo y tambien en el root-reducer, mirar los archivos para más informacion.
//? finalmente en el index.js importo el persisGate y el persistore para envolver al componente principal que en este caso es app.js,debo ponerla directamente fuera de la app pero dentro del router y del store, para que ella pueda acceder al state justo antes de que se refresque la pag.
//? Lo genial de esto es que me deja poner cuales reducer quiero poner en el local storage, y además las puedo añadir de manera muy fácil!

//! Stripe
//? Estripe es una plataforma que permite los pagos en internet, para usarla creo una cuanta en su página y creo la librería en el proyecto con "yarn add stripe-react-checkout"
//? Lo que esa librería permite es que pueda añadir una boton para activar la ventana emergente de pagos, para eso creo el componente stripe, pero antes de eso debo agarrar la publishable Key desde la página, en la perstaña para desarrolladores.
//? En el repositoria de React-Stripe esta toda la informacion sobre las cosas que se le puden añadir a al voton y la ventana emergente que se usa para el pago.
//? La página dá una tarjeta de crédito de prueba donde se pueden testear como sería un pago en la vida real.
//? Para estilizar el boton se usa el elmento 'button' en css, ya que react reconoce al boton como un boton aunque no se llame de esa manera en el componente creado.

//! HEROKU
//? Heroku es como vercel pero mejor, permite proyectos con backend, además tiene el programa de terminal heroku-cli, el cual se instala en linux y en cualquier sistema operativo.
//? Para subir un proyecto a Heroku es muy sencillo, primero logeo en mi cuenta con "heroku login" segundo hago el proyecto con "heroku create project-name --buidpack https://github.com/mars/create-react-app-buildpack.git" para que cree el app con react, luego "git push heroku main"
