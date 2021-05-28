import React from "react";

const BestSeller = () => {
  const { products } = props;
  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <h2 className="mb-2 mt-4">Best Sellers</h2>
        <div className="row">
          {products.map((product, i) => (
            <div key={i} className="col-md-4 col-sm-12">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
