import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registrationUser } from "../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import validate from "../helpers/validate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Auth.css";
const Registration = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if ((firstName, lastName, email, password)) {
      try {
        debugger;

        setDisabled(true);
        const inputs = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

        const validation = await validate(inputs);

        if (
          validation.firstName !== undefined ||
          validation.lastName !== undefined ||
          validation.email !== undefined ||
          validation.password !== undefined
        ) {
          if (validation.firstName) {
            setError(validation.firstName);
          }
          if (validation.lastName) {
            setError(validation.lastName);
          }

          if (validation.email) {
            setError(validation.email);
          }

          if (validation.password) {
            setError(validation.password);
          }
          setDisabled(false);
          return;
        }

        await dispatch(registrationUser(firstName, lastName, email, password));

        setDisabled(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setDisabled(false);
      }
    }
  };
  const registered = useSelector((state) => state.authReducer.registered);
  console.log(registered);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Registration</h1>
                </div>
                {error !== "" ? (
                  <div className="error">
                    <span style={{ color: "red" }}>{error} </span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                    name="firstName"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Last name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    name="lastName"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>

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
                    minLength="8"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our
                    <a href="###">Terms Of Use</a>
                  </p>
                </div>
                <div className="col-md-12 text-center ">
                  <button
                    type="submit"
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                    disabled={disabled}
                  >
                    Registration
                  </button>
                </div>

                <div className="form-group">
                  <p className="text-center">
                    Already have an account?
                    <Link to="/login" id="login">
                      Sign in here
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

export default Registration;
