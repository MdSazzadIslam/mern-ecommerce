const saveDataInCart = async (_id, name, image, price, qty) => {
  debugger;
  let products = [];
  if (localStorage.getItem("carts")) {
    products = await JSON.parse(localStorage.getItem("carts"));
  }
  let item = products.find((item) => item._id === _id);

  if (item) {
    item.qty += 1;
  } else {
    products.push({
      _id: _id,
      name: name,
      image: image,
      price: 500,
      qty: 1,
    });
  }

  await localStorage.setItem("carts", JSON.stringify(products));
};

const deleteDataFromCart = async (_id) => {
  debugger;
  let products = [];
  if (localStorage.getItem("carts")) {
    products = await JSON.parse(localStorage.getItem("carts"));
  }
  const filteredItems = products.filter((item) => item._id !== _id);
  await localStorage.setItem("carts", JSON.stringify(filteredItems));
};

const incQtyIntoCart = async (_id, qty) => {
  debugger;
  let products = [];
  if (localStorage.getItem("carts")) {
    products = await JSON.parse(localStorage.getItem("carts"));
  }
  let item = products.find((item) => item._id === _id);

  if (item) {
    item.qty += 1;
  }
  await localStorage.setItem("carts", JSON.stringify(products));
};

const decQtyFromCart = async (_id, qty) => {
  debugger;
  let products = [];
  if (localStorage.getItem("carts")) {
    products = await JSON.parse(localStorage.getItem("carts"));
  }
  let item = products.find((item) => item._id === _id);

  if (item) {
    item.qty -= 1;
  }
  await localStorage.setItem("carts", JSON.stringify(products));
};

export { saveDataInCart, deleteDataFromCart, incQtyIntoCart, decQtyFromCart };
