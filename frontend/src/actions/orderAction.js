import {
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "../constants/orderconstant";
import { toast } from "react-toastify";
import orderService from "../services/orderService";

export function createOrders(products, tranId, amount, address) {
  debugger;
  return async (dispatch) => {
    dispatch(createOrder());
    try {
      debugger;
      await orderService
        .createOrder(products, tranId, amount, address)
        .then((res) => {
          debugger;
          if (res.data.success === false || res.data.success === undefined) {
            toast.error(res.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
              toastId: "001",
            });
            dispatch(createOrderError(res));
          } else {
            toast.success(res.data.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
              toastId: "001",
            });
            dispatch(createOrderSuccess(res.data.msg));
          }
        });
    } catch (error) {
      dispatch(createOrderError(error));
    }
  };
}

export function createOrder() {
  return {
    type: CREATE_ORDER,
  };
}

export function createOrderSuccess(success) {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: { success },
  };
}

export function createOrderError(error) {
  return {
    type: CREATE_ORDER_ERROR,
    payload: { error },
  };
}

export function getOrders() {
  return async (dispatch) => {
    debugger;
    dispatch(getOrder());
    try {
      await orderService.getOrder().then((res) => {
        debugger;
        if (res.data === false || res.data === undefined) {
          dispatch(getOrderError(res));
        } else {
          dispatch(getOrderSuccess(res.data));
        }
      });
    } catch (error) {
      dispatch(getOrderError(error));
    }
  };
}

export function getOrder() {
  return {
    type: GET_ORDER,
  };
}

export function getOrderSuccess(success) {
  return {
    type: GET_ORDER_SUCCESS,
    payload: { success },
  };
}

export function getOrderError(error) {
  return {
    type: GET_ORDER_ERROR,
    payload: { error },
  };
}
