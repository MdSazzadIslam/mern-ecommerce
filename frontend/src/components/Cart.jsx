import React, { useState, Fragment, shallowEqual } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCart,
  incrementCart,
  decrementCart,
  removeCart,
} from "../actions/cartAction";
import { createOrders } from "../actions/orderAction";
import { Link, useHistory } from "react-router-dom";
import {
  deleteDataFromCart,
  incQtyIntoCart,
  decQtyFromCart,
} from "../helpers/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("Dhaka, Bangladesh");

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const cart = useSelector((state) => state.cartReducer);
  const { carts, deleted } = cart;
  const user = useSelector((state) => state.authReducer, shallowEqual);
  const { loggedIn } = user;
  let total;

  const totalAmount = (arr) =>
    arr.reduce((sum, { price, qty }) => sum + price * qty, 0);
  debugger;
  if (carts.length > 0) {
    total = totalAmount(carts);
  }

  const deleteCartHandler = async (e, _id) => {
    debugger;
    setDisabled(true);
    await dispatch(deleteCart(_id));
    await deleteDataFromCart(_id);
    console.log(deleted);
    setDisabled(false);
  };

  const incrementHandler = async (e, _id, qty) => {
    debugger;

    if (qty >= 1) {
      setDisabled(true);
      await dispatch(incrementCart(_id, qty));
      await incQtyIntoCart(_id, qty);
      setDisabled(false);
    }
  };

  const decrementHandler = async (e, _id, qty) => {
    debugger;
    if (qty > 1) {
      setDisabled(true);
      await dispatch(decrementCart(_id, qty));
      await decQtyFromCart(_id, qty);
      setDisabled(false);
    }
  };

  const orderHandler = async (e) => {
    debugger;
    if (address === undefined || address === null || address === "") {
      toast.warn("Delivery address required!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
        toastId: "001",
      });
      setError("Delivery address required!!!");
    } else {
      setDisabled(true);
      try {
        await dispatch(
          createOrders(
            carts,
            Math.floor(Math.random() * 1000000 + 1),
            total,
            address
          )
        );
        await dispatch(removeCart());

        setDisabled(false);
      } catch (error) {
        setDisabled(false);
        console.warn(error);
      }
    }
  };

  const cartsData = carts.map((product) => {
    const imageUrl = `${process.env.REACT_APP_IMAGE_URL + product.image}`;

    return (
      <Fragment key={product._id}>
        <tr key={product._id}>
          <td>
            <img src={imageUrl} width="70px" alt={product.name} />
          </td>
          <td>{product.name}</td>
          <td>In stock</td>
          <td>
            <input
              className="form-control"
              type="text"
              value={product.qty}
              disabled
            />
          </td>
          <td>
            <button
              className="btn btn-primary"
              disabled={disabled}
              onClick={(e) => incrementHandler(e, product._id, product.qty)}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-primary"
              disabled={disabled}
              onClick={(e) => decrementHandler(e, product._id, product.qty)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
          </td>

          <td className="text-right">{product.price}</td>
          <td className="text-right">
            <button
              className="btn btn-sm btn-danger"
              disabled={disabled}
              onClick={(e) => deleteCartHandler(e, product._id)}
            >
              <i className="fa fa-trash" />
            </button>
          </td>
        </tr>
      </Fragment>
    );
  });

  return (
    <>
      {carts.length === 0 ? (
        <div className="col mb-2">
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Cart is Empty. Please add some items.
          </h3>
        </div>
      ) : (
        <div>
          {loggedIn === true ? (
            <>
              <div className="container mb-4">
                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col">Available</th>
                            <th scope="col" className="text-center">
                              Quantity
                            </th>
                            <th scope="col" className="text-right">
                              Price
                            </th>
                            <th> </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartsData}
                          <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td>Sub-Total</td>
                            <td className="text-right">{total}</td>
                          </tr>

                          <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td>Shipping</td>
                            <td className="text-right">0</td>
                          </tr>

                          <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td>
                              <strong>Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>{total}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {error !== "" ? (
                        <div className="error">
                          <span style={{ color: "red" }}>{error} </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Delivery address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        style={{ marginBottom: "10px" }}
                      />
                    </div>
                  </div>

                  <div className="col mb-2">
                    <div className="row">
                      <div className="col-sm-12  col-md-6">
                        <Link to="/product" className="btn btn-block btn-light">
                          Continue Shopping
                        </Link>
                      </div>

                      <div className="col-sm-12 col-md-6 text-right">
                        <button
                          className="btn btn-lg btn-block btn-success text-uppercase"
                          onClick={(e) => orderHandler(e)}
                          disabled={disabled}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Please login
            </h3>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Cart;
