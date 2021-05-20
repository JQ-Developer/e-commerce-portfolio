import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Yihua's config
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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
