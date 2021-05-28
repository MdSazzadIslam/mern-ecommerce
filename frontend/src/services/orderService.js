import http from "../config";
class orderService {
  static createOrder = async (products, tranId, amount, address) => {
    debugger;
    return await http
      .post("order/create", {
        products: products,
        tranId: tranId,
        amount: amount,
        address: address,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  static getOrder = async () => {
    return await http
      .get("order")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response.data;
      });
  };
}
export default orderService;
