import React, { shallowEqual } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/authAction";
import { useHistory } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../assests/images/logo.png";
import "./Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authReducer, shallowEqual);
  const { loggedIn } = user;

  const carts = useSelector((state) => state.cartReducer.carts);

  let totalQty;
  if (carts.length > 0) {
    totalQty = carts.length;
  }

  const submitHandler = async (e) => {
    debugger;
    e.preventDefault();
    await dispatch(logoutUser());
    debugger;
    if (loggedIn === false) {
      history.push("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      {/*    <form className="form-inline my-2 my-lg-0">
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search..."
          />
          <div className="input-group-append">
            <button type="button" className="btn btn-secondary btn-number">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form> */}

      <div className="header_container">
        <ul className="header_nav">
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/cart">
              <svg
                className="cart-svg "
                width={16}
                height={16}
                viewBox="0 0 16 16 "
              >
                <path
                  d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86 "
                  fill="#fff "
                />
              </svg>
              Cart
              <span className="badge badge-light">{totalQty}</span>
            </Link>
          </li>
          <>
            {loggedIn === false ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/profile">profile</Link>
                </li>
                <li>
                  <Nav.Link onClick={submitHandler}>Logout</Nav.Link>
                </li>
              </>
            )}
          </>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
