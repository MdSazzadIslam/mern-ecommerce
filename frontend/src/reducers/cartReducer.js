import {
  ADD_TO_CART,
  DELETE_CART,
  INCREMENT_CART,
  DECREMENT_CART,
  REMOVE_CART,
} from "../constants/cartConstant";

const carts = JSON.parse(localStorage.getItem("carts"));

const initialState = carts
  ? {
      carts: carts,
    }
  : {
      carts: [],
      added: false,
      deleted: false,
      incremented: false,
      removed: false,
    };

export default function cartReducer(state = initialState, action) {
  let tempCart = state.carts.slice();
  switch (action.type) {
    case ADD_TO_CART:
      let newCart;
      let exists = false;

      const newState = state.carts.map((item) => {
        if (item._id === action.payload.product._id) {
          item.qty += 1;
          exists = true;
        }
        return item;
      });
      console.log(newState);

      if (exists === true) {
        newCart = tempCart;
      } else {
        newCart = tempCart.concat(action.payload.product);
      }

      return {
        ...state,
        added: true,
        carts: newCart,
      };

    case DELETE_CART:
      const deleteCart = tempCart.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        deleted: true,
        carts: deleteCart,
      };

    case INCREMENT_CART:
      const newIncCart = state.carts.map((item) => {
        if (item._id === action.payload._id) {
          item.qty += 1;
        }
        return item;
      });

      return {
        ...state,
        incremented: true,
        carts: newIncCart,
      };

    case DECREMENT_CART:
      const newDecCart = state.carts.map((item) => {
        if (item._id === action.payload._id) {
          item.qty -= 1;
        }
        return item;
      });

      return {
        ...state,
        incremented: true,
        carts: newDecCart,
      };

    case REMOVE_CART:
      return {
        ...state,
        removed: true,
        carts: [],
      };

    default:
      return state;
  }
}
