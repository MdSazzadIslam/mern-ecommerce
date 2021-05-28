import {
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from "../constants/productConstant";

const initialState = {
  products: [],
  saved: false,
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.success,
      };

    case GET_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        products: {},
      };

    default:
      return state;
  }
}
