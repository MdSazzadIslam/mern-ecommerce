import {
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
} from "../constants/orderconstant";

const initialState = {
  orders: [],
  data: {},
  saved: false,
  loading: false,
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        saved: false,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_ORDER_ERROR:
      return {
        ...state,
        saved: false,
        error: action.payload.error,
        data: {},
      };

    case GET_ORDER:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDER_SUCCESS:
      debugger;
      return {
        ...state,
        loading: false,
        orders: action.payload.success,
      };

    case GET_ORDER_ERROR:
      debugger;
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        orders: [],
      };

    default:
      return state;
  }
}
