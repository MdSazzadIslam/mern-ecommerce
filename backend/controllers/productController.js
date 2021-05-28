"use strict";
const productService = require("../services/productService");

exports.getAll = async (req, res, next) => {
  try {
    const products = await productService.getAll();
    return res.status(200).send({
      products: products,
      msg: "Successfull",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const products = await productService.getById(req.params.id);
    return res.send(products);
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.create = async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ success: false, msg: "Only image are allowed" });
  }

  const data = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: req.file.filename,
    brand: req.body.brand,
    rating: req.body.rating,
  };
  try {
    const result = await productService.create(data);
    if (result) {
      res.status(201).send({ success: true, message: "Successfull" });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const isExists = await productService.getById(req.params.id);
    if (isExists) {
      isExists.name = req.body.name;
      const result = await productService.update(req.params.id, isExists);

      if (result) {
        res.status(200).send({ success: true, msg: "Successfull" });
      } else {
        return res
          .status(204)
          .send({ success: false, message: "Something went wrong" });
      }
    } else {
      return res.status(400).send({ success: false, msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await productService.delete(req.params.id);
    if (result) {
      res.status(200).send({ success: true, msg: "Deleted" });
    } else {
      return res
        .status(401)
        .send({ success: true, msg: "No record found to delete" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};
