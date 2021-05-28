import http from "../config";

class productService {
  static getProduct = async () => {
    return await http
      .get("product")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response.data;
      });
  };
}
export default productService;
