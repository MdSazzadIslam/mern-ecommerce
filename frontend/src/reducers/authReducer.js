import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  ACTIVATE_USER,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_ERROR,
  LOGOUT,
} from "../constants/authConstant";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { loggedIn: true, user, error: null }
  : {
      loggedIn: false,
      user: {},
      activeUser: null,
      registered: false,
      error: null,
    };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: false,
        error: null,
      };

    case LOGIN_SUCCESS:
      const newUser = user || action.payload.success;
      return {
        ...state,
        loggedIn: true,
        error: false,
        user: newUser,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
        error: action.payload.error,
        user: {},
      };

    case REGISTRATION:
      return {
        ...state,
        registered: false,
        error: null,
      };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registered: true,
        error: false,
        register: action.payload.success,
      };

    case REGISTRATION_ERROR:
      return {
        ...state,
        registered: false,
        error: action.payload.error,
        register: {},
      };

    case ACTIVATE_USER:
      return {
        ...state,
        registered: false,
        error: null,
      };

    case ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        registered: true,
        error: false,
        activeUser: action.payload.success,
      };

    case ACTIVATE_USER_ERROR:
      return {
        ...state,
        registered: false,
        error: action.payload.error,
        activeUser: {},
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {},
        error: false,
      };

    default:
      return state;
  }
}
