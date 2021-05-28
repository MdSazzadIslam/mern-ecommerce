import React from "react";
import "./Product.css";

const Product = () => {
  return (
    <div className="col-md-9">
      <div className="row g-2">
        <div className="col-md-4">
          <div className="product py-4">
            <span className="off bg-success">-25% OFF</span>
            <div className="text-center">
              <img
                src="https://i.imgur.com/nOFet9u.jpg"
                width={200}
                alt="logo"
              />
            </div>
            <div className="about text-center">
              <h5>XRD Active Shoes</h5> <span>$1,999.99</span>
            </div>
            <div className="cart-button mt-3 px-2 d-flex justify-content-between align-items-center">
              <button className="btn btn-primary text-uppercase">
                Add to cart
              </button>
              <div className="add">
                <span className="product_fav">
                  <i className="fa fa-heart-o" />
                </span>
                <span className="product_fav">
                  <i className="fa fa-opencart" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
