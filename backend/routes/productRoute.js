"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dir = "./images";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, "./images");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post(
  "/create",
  verifyToken,
  upload.single("image"),
  productController.create
);
router.put("/update/:id", verifyToken, productController.update);
router.delete("/delete/:id", verifyToken, productController.delete);

module.exports = router;
