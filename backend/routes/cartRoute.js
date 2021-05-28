"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, cartController.getAll);
router.get("/:id", verifyToken, cartController.getById);
router.post("/create", verifyToken, cartController.create);
router.put("/update/:id", verifyToken, cartController.update);
router.delete("/delete/:id", verifyToken, cartController.delete);
module.exports = router;
