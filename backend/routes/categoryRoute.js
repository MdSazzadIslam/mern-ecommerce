"use strict";
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, categoryController.getAll);
router.get("/:id", verifyToken, categoryController.getById);
router.post("/create", verifyToken, categoryController.create);
router.put("/update/:id", verifyToken, categoryController.update);
router.delete("/delete/:id", verifyToken, categoryController.delete);
module.exports = router;
