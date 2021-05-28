import {
  ADD_TO_CART,
  DELETE_CART,
  INCREMENT_CART,
  DECREMENT_CART,
  REMOVE_CART,
} from "../constants/cartConstant";

export function addToCart(product) {
  debugger;
  return {
    type: ADD_TO_CART,
    payload: { product },
  };
}
export function deleteCart(_id) {
  debugger;
  return {
    type: DELETE_CART,
    payload: { _id },
  };
}
export function incrementCart(_id, qty) {
  debugger;
  return {
    type: INCREMENT_CART,
    payload: { _id, qty },
  };
}

export function decrementCart(_id, qty) {
  debugger;
  return {
    type: DECREMENT_CART,
    payload: { _id, qty },
  };
}

export function removeCart() {
  localStorage.removeItem("carts");
  debugger;
  return {
    type: REMOVE_CART,
  };
}
