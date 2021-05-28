import React from "react";
import "./Product.css";

const ProductSidebar = (props) => {
  return (
    <div className="t-products p-2">
      <h6 className="text-uppercase">Computer &amp; Periferals</h6>
      <div className="p-lists">
        <div className="d-flex justify-content-between mt-2">
          <span>Laptops</span> <span>23</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Desktops</span> <span>46</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Monitors</span> <span>13</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Mouse</span> <span>33</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Keyboard</span> <span>12</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Printer</span> <span>53</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>Mobiles</span> <span>203</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>CPU</span> <span>23</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
