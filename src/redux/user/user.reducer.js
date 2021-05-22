//La primera vez que se dispara una accion no hay un state, es por eso que definimos un state inicial, que luego se lo pongo como un valor por default a la funcion reducer. Recuerda que aunque el valor que pase sea null , reducer se disparará.

//! Importante ; cada reducer recibe cada accion que se dispara en la aplicacion, por eso es importante definir los tipos de acciones que cada reducer dispara.

const INITIAL_STATE = {
  currentUser: null,
};

//Un reducer es una funcion que toma dos argumentos, un estado inicial y una
//accion ===> que es un objeto que tiene un type que es una string, otra cosa uqe puede recibir es un payload, que permite meter datos adicionales por si queremos pasar datos adicionales al state
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
