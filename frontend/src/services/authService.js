import http from "../config";

class authServices {
  static login = async (email, password) => {
    debugger;
    try {
      return await http
        .post(`user/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.success !== false && res.data.success !== undefined) {
            if (res.data.token) {
              localStorage.setItem("user", JSON.stringify(res.data));
            }
          }

          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.error(error);
    }
  };

  static registration = async (firstName, lastName, email, password) => {
    debugger;
    try {
      return await http
        .post(`user/registration`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log(error);
    }
  };

  static activateUserToken = async (token) => {
    debugger;
    try {
      return await http
        .put(`user/activation/${token}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async () => {
    return await localStorage.removeItem("user");
  };
}
export default authServices;
