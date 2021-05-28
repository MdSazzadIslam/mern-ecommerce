import React from "react";
import "../components/Profile.css";
const OrderStatus = ({ orders, title }) => {
  console.log("orders", orders);
  console.log("tran id", orders._id);

  const ordersData = orders.map((order) => {
    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="d-flex flex-column justify-content-between order-summary">
            <div className="d-flex align-items-center">
              <div className="text-uppercase">Order #{order.tranId}</div>
              <div className="blue-label ms-auto text-uppercase">COD</div>
            </div>
            <div className="fs-8">Products #{order.products.length}</div>
            {/*   <div className="fs-8">22 August, 2020 | 12:05 PM</div> */}
          </div>
        </div>
        <div className="col-lg-8">
          <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
            <div className="status">Status : {order.status}</div>
            <div className="btn btn-primary text-uppercase">order info</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div key={orders._id}>
      <div className="text-uppercase">{title}</div>
      <div className="order my-3 bg-light">{ordersData}</div>
    </div>
  );
};

export default OrderStatus;
