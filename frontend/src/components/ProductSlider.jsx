import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductSlider = ({ products, title }) => {
  return (
    <div className="continer">
      <Carousel pause="hover" className="bg-dark" style={{ width: "100%" }}>
        <h5>{title}</h5>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={process.env.REACT_APP_IMAGE_URL + product.image}
                alt={product.name}
                fluid
                style={{
                  width: "100%",
                  height: "400px",
                }}
              />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
