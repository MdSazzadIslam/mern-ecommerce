import {
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from "../constants/productConstant";
import productService from "../services/productService";

export function getProducts() {
  return async (dispatch) => {
    dispatch(getProduct());
    try {
      await productService.getProduct().then((res) => {
        if (res.data === false || res.data === undefined) {
          dispatch(getProductError(res));
        } else {
          dispatch(getProductSuccess(res.data.products));
        }
      });
    } catch (error) {
      dispatch(getProductError(error));
    }
  };
}

export function getProduct() {
  return {
    type: GET_PRODUCT,
  };
}

export function getProductSuccess(success) {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function getProductError(error) {
  return {
    type: GET_PRODUCT_ERROR,
    payload: { error },
  };
}
