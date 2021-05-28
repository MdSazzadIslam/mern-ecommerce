import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../actions/orderAction";
import OrderStatus from "../components/OrderStatus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Profile.css";

const Profile = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.authReducer);
  const { user, loggedIn } = users;

  const orders = useSelector((state) => state.orderReducer.orders);
  const carts = useSelector((state) => state.cartReducer.carts);

  const fetchOrder = async () => {
    await dispatch(getOrders());
  };

  useEffect(() => {
    fetchOrder();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loggedIn === false) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <Sidebar props={props} />

          <div className="col-lg-9 my-lg-0 my-1">
            <div id="main-content" className="bg-white border">
              <div className="d-flex flex-column">
                <div className="h5">
                  Hello {user.firstName + " " + user.lastName},
                </div>
                <div>Logged in as: {user.email}</div>
              </div>
              <div className="d-flex my-4 flex-wrap">
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://www.freepnglogos.com/uploads/box-png/cardboard-box-brown-vector-graphic-pixabay-2.png"
                    alt="logo"
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag">Orders placed</div>
                    <div className="ms-auto number">{orders.length}</div>
                  </div>
                </div>
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-campus-recreation-university-nebraska-lincoln-30.png"
                    alt="logo"
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag">Items in Cart</div>
                    <div className="ms-auto number">{carts.length}</div>
                  </div>
                </div>
                <div className="box me-4 my-1 bg-light">
                  <img
                    src="https://www.freepnglogos.com/uploads/love-png/love-png-heart-symbol-wikipedia-11.png"
                    alt="logo"
                  />
                  <div className="d-flex align-items-center mt-2">
                    <div className="tag">Wishlist</div>
                    <div className="ms-auto number">0</div>
                  </div>
                </div>
              </div>

              <OrderStatus orders={orders} title="My recent orders" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
