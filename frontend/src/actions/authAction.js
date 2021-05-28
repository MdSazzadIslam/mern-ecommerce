import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  ACTIVATE_USER,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_ERROR,
} from "../constants/authConstant";
import { toast } from "react-toastify";
import authService from "../services/authService";

export function loginUser(email, password) {
  return async (dispatch) => {
    dispatch(login());
    try {
      await authService.login(email, password).then((res) => {
        debugger;
        if (res.data.success === false || res.data.success === undefined) {
          toast.error(res.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            toastId: "001",
          });

          dispatch(loginError(res));
        } else {
          dispatch(loginSuccess(res.data));
        }
      });
    } catch (error) {
      dispatch(loginError(error));
      console.log(error);
    }
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSuccess(success) {
  return {
    type: LOGIN_SUCCESS,
    payload: { success },
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: { error },
  };
}

export function registrationUser(firstName, lastName, email, password) {
  return async (dispatch) => {
    dispatch(registration());
    try {
      debugger;
      await authService
        .registration(firstName, lastName, email, password)

        .then((res) => {
          debugger;
          if (res.data.success === false || res.data.success === undefined) {
            toast.error(res.data.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
              toastId: "001",
            });
            dispatch(registrationError(res.data));
          } else {
            toast.success(res.data.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
              toastId: "001",
            });
            dispatch(registrationSuccess(res.data));
          }
        });
    } catch (error) {
      dispatch(registrationError(error));
      console.log(error);
    }
  };
}

export function registration() {
  return {
    type: REGISTRATION,
  };
}

export function registrationSuccess(success) {
  return {
    type: REGISTRATION_SUCCESS,
    payload: { success },
  };
}

export function registrationError(error) {
  return {
    type: REGISTRATION_ERROR,
    payload: { error },
  };
}

export function logoutUser() {
  debugger;
  authService.logout();
  return {
    type: LOGOUT,
  };
}

export function activateUserToken(token) {
  return async (dispatch) => {
    dispatch(activateUser());
    try {
      await authService.activateUserToken(token).then((res) => {
        if (res.data.success === false || res.data.success === undefined) {
          toast.error(res.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            toastId: "001",
          });

          dispatch(activateUserError(res));
        } else {
          toast.success(res.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            toastId: "001",
          });
          dispatch(activateUserSuccess(res.data));
        }
      });
    } catch (error) {
      dispatch(activateUserError(error));
      console.log(error);
    }
  };
}

export function activateUser() {
  return {
    type: ACTIVATE_USER,
  };
}
export function activateUserSuccess(success) {
  return {
    type: ACTIVATE_USER_SUCCESS,
    payload: { success },
  };
}
export function activateUserError(error) {
  return {
    type: ACTIVATE_USER_ERROR,
    payload: { error },
  };
}
