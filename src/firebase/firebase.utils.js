import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//
const config = {
  apiKey: "AIzaSyCkTG7MBe_V5vqo1HxhuWJfssHbG8HAAKw",
  authDomain: "crown-ecomerce-react.firebaseapp.com",
  projectId: "crown-ecomerce-react",
  storageBucket: "crown-ecomerce-react.appspot.com",
  messagingSenderId: "428364557619",
  appId: "1:428364557619:web:1739d84fb1585747ab2246",
  measurementId: "G-YBRXCZ3CW7",
};
//

//Esto permite añadir los usuarios a la base de datos
//El userAuth es el objeto que regresa la funcion de App cada vez que se inicia sesion desde google.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //Aqui estoy pidiendo un documentRef object, que dice las especificaciones de este usuario, además de otras propiedades
  //uid es la id del usuario que google crea cuando se crea una cuenta en la base de datos de firebase
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // Ahora pido una snapshot, la cual me da una captura de las porpiedades de DocumentRef, incluyendo si es que este documento existe en la collection.
  const snapShot = await userRef.get();

  //Ahora si no existe, usaremos el documentRef object, NO la snapshot
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;

  //console.log(snapShot);
};

//

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
