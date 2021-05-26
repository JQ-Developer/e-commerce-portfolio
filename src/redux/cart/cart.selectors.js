import { createSelector } from "reselect";

//Esto es un input selector, toma todo el state y devuelve solo un aparte de ello
const selectCart = (state) => state.cart;

//Esto es un memoizes selector, que toma dos argumentos uno con el array de todos los datos que se le quieren meter, y el otro con una funcion diciendo que es lo que se quiere sacar de ahí
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
