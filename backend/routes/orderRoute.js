"use strict";
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, orderController.getAll);
router.get("/:id", verifyToken, orderController.getById);
router.post("/create", verifyToken, orderController.create);
router.put("/update/:id", verifyToken, orderController.update);
router.delete("/delete/:id", verifyToken, orderController.delete);
module.exports = router;
