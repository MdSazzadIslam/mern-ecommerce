import React from "react";
import Slider from "react-slick";
import First from "../assests/images/banner1.jpg";
import Second from "../assests/images/banner1.jpg";
import Third from "../assests/images/banner1.jpg";
import "./Slider.css";
const HPSlider = () => {
  const slides = [
    {
      img: First,
      lineOne: "Fender",
      lineTwo: "Custom shop",
      linkTitle: "Shop now",
      linkTo: "/product",
    },
    {
      img: Second,
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/product",
    },

    {
      img: Third,
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/product",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const getSlider = slides.map(function (item, i) {
    return slides ? (
      <div key={i}>
        <div
          className="slider_image"
          style={{
            backgroundImage: `url(${item.img})`,
          }}
        >
          <div className="slider_action">
            {/*  <div className="slider_container">
              <div className="slider_first_title">{item.lineOne}</div>
              <div className="slider_second_title">{item.lineTwo}</div>
            </div> */}

            {/*   <div>
              <input type="button" title={item.linkTitle} />
            </div> */}
          </div>
        </div>
      </div>
    ) : null;
  });

  return (
    <div className="slider">
      <Slider {...settings}>{getSlider}</Slider>
    </div>
  );
};

export default HPSlider;
