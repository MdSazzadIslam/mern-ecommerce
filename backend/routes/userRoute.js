"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, userController.getAll);
router.get("/:id", verifyToken, userController.getById);
router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.put("/activation/:token", userController.activateUser);
router.delete("/delete/:id", verifyToken, userController.deleteUser);
router.put("/update/:id", verifyToken, userController.updateUser);
module.exports = router;
