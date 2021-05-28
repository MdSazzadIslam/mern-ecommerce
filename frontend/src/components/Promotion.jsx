import React from "react";
import PImage from "../assests/images/new.jpg";
import "./Promotion.css";
const Promotion = () => {
  const pImages = {
    img: PImage,
    lineOne: "Up to 40% off",
    lineTwo: "harry up",
    linkTitle: "Shop now",
    linkTo: "/product",
  };

  const getPromotion = () =>
    pImages ? (
      <div
        className="promotion_img"
        style={{
          background: `url(${pImages.img})`,
        }}
      >
        {/*  <div className="container">
          <div className="promotion_first_title">{pImages.lineOne}</div>
          <div className="promotion_second_title">{pImages.lineTwo}</div>
        </div> */}

        {/*    <div>
          <input type="button" title={pImages.linkTitle} />
        </div> */}
      </div>
    ) : null;

  return <div className="promotion">{getPromotion()}</div>;
};

export default Promotion;
