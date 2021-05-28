"use strict";
const categoryService = require("../services/categoryService");

exports.getAll = async (req, res, next) => {
  try {
    const products = await categoryService.getAll();
    res.json(products);
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const products = await categoryService.getById(req.params.id);
    res.json(products);
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
    };

    const isExists = await categoryService.isNameExists(req.body.name);
    if (isExists) {
      return res
        .status(400)
        .send({ success: false, msg: "Category name already exists" });
    }

    const result = await categoryService.create(data);
    if (result) {
      res.status(201).send({ success: true, msg: "Successfull" });
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
    const isExists = await categoryService.getById(req.params.id);
    if (isExists) {
      isExists.name = req.body.name;
      const result = await categoryService.update(req.params.id, isExists);

      if (result) {
        res.status(200).send({ success: true, msg: "Successfull" });
      } else {
        return res
          .status(204)
          .send({ success: false, message: "Something went wrong" });
      }
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Category not found" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await categoryService.delete(req.params.id);
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
