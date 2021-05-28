import React, { useState, shallowEqual } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import validate from "../helpers/validate";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Auth.css";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.authReducer, shallowEqual);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        setDisabled(true);

        const inputs = {
          email: email,
          password: password,
        };

        const validation = await validate(inputs);

        if (
          validation.email !== undefined ||
          validation.password !== undefined
        ) {
          if (validation.password) {
            setError(validation.password);
          }
          if (validation.email) {
            setError(validation.email);
          }
          setDisabled(false);
          return;
        } else {
          await dispatch(loginUser(email, password));
          //alert(user.msg);

          /*  if (user.success === false) {
            setError(user.msg);
          } */

          setDisabled(false);
        }
      } catch (err) {
        setError(err);
        setDisabled(false);
      }
    } else {
      setError("Please Enter email and password.");
      setDisabled(false);
      return;
    }
  };

  if (user.loggedIn === true) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Login</h1>
                </div>
                {error !== "" ? (
                  <div className="error">
                    <span style={{ color: "red" }}>{error} </span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    minLength="8"
                  />
                </div>
                <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our <a href="###">Terms Of Use</a>
                  </p>
                </div>
                <div className="col-md-12 text-center ">
                  <button
                    type="submit"
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                    disabled={disabled}
                  >
                    Login
                  </button>
                </div>

                <div className="form-group">
                  <p className="text-center">
                    Don't have account?
                    <Link to="/registration" id="signup">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
