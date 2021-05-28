import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Card from "./Card";
import Loader from "./Loader";
import ProductSlider from "./ProductSlider";
const NewArrival = () => {
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const { products, loading, error } = productReducer;

  const fetchProdcut = async () => {
    await dispatch(getProducts());
  };

  useEffect(() => {
    fetchProdcut();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <h5>something went wrong</h5>;
  }
  return (
    <Fragment>
      <ProductSlider products={products} title="New Arrival" />
    </Fragment>
  );
};

export default NewArrival;
