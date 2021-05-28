import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Card from "../components/Card";
import Loader from "../components/Loader";
const Products = (props) => {
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
    <div className="home">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-12">
          <div className="row">
            {products.map((product, i) => (
              <div key={product._id} className="col-md-4 col-sm-12">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
