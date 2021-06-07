import { put, takeLatest, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSucces,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // el segundo argumento de la funcion call es el argumento de la callback
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();

    yield put(signInSucces({ id: userSnapshot.id, ...userSnapshot.data() }));

    //
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    //Esta llamada regreasa un objeto con el resultado del popup de google, ese objeto tendrá la propiedad user, que tiene los datos que tenemos en firebase, (id, name, email, etc)
    const { user } = yield auth.signInWithPopup(googleProvider);

    yield getSnapshotFromUserAuth(user);

    //
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

///////// Email Sign in
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    //Al igual que en signInWithGoogle este metodo de auth, me regresa un objeto con las propiedades que necesito
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);

    //
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

///////// Persistence in session
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

///////// sign up
export function* signUp({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    //Esta funcion crea un objeto con un usuario y contraseña
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield createUserProfileDocument(user, { displayName });

    yield put(signUpSuccess({ user, additionalData: { displayName } }));
    //
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

///////// sign out
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

///////// To root-saga
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUp),
    call(onSignUpSuccess),
  ]);
}
