import React, { shallowEqual } from "react";
import Rating from "./Rating";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart } from "../actions/cartAction";
import { saveDataInCart } from "../helpers/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Card.css";

const Card = ({ product }) => {
  debugger;
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer, shallowEqual);

  const { loggedIn } = user;
  const cart = useSelector((state) => state.cartReducer, shallowEqual);
  const { added } = cart;

  const imageUrl = `${process.env.REACT_APP_IMAGE_URL + product.image}`;
  const cartHandler = async (e) => {
    debugger;
    e.preventDefault();
    if (loggedIn === false) {
      toast.warn("Please login!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
        toastId: "001",
      });

      history.push("/login");
    } else {
      const data = {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: 500,
        qty: 1,
      };
      await dispatch(addToCart(data));
      await saveDataInCart(product._id, product.name, product.image, 500, 1);
      if (added === true) {
        toast.success("Added", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          toastId: "001",
        });
      }
    }
  };
  return (
    /*  <div class="container mt-5 mb-5 d-flex justify-content-center align-items-left"> */

    <div className="new_card" key={product._id}>
      <div className="inner-card">
        <img src={imageUrl} className="img-fluid rounded" alt={product.name} />
        <div className="d-flex justify-content-between align-items-center mt-3 px-2">
          <h4>{product.name}</h4>
          <span className="heart">
            <i className="fa fa-heart" />
          </span>
        </div>
        <div className="mt-2 px-2">
          <small>{product.description}</small>
        </div>
        <div className="px-2">
          <h3>{product.price}</h3>
        </div>
        <Rating rating={product.rating} reviews="10" />

        <div className="px-2 mt-3">
          {/*   <button className="btn btn-primary px-3">Buy Now</button> */}
          <button
            className="btn btn-outline-primary px-3"
            onClick={(e) => cartHandler(e)}
          >
            Add to cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>

    /*  </div> */
  );
};

export default Card;
