import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;

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
