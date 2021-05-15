import React from "react";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";

function App() {
  return (
    <div>
      <HomePage />
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
