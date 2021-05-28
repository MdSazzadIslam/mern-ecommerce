"use strict";
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, inventoryController.getAll);
router.get("/:id", verifyToken, inventoryController.getById);
router.post("/create", verifyToken, inventoryController.create);
router.put("/update/:id", verifyToken, inventoryController.update);
router.delete("/delete/:id", verifyToken, inventoryController.delete);
module.exports = router;
