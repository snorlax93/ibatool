const express = require("express");
const router = express.Router();

//Comments Routes
router.get("/", (req, res) => {
  res.send("Comments Routes - GET default");
});

router.get("/all", (req, res) => {
  res.send("Comments Routes - GET all");
});

router.get("/single/:param", (req, res) => {
  res.send("Comments Routes - GET single param");
});

router.post("/new", (req, res) => {
  res.send("Comments Routes - POST single param");
});

router.patch("/edit/:param", (req, res) => {
  res.send("Comments Routes - PATCH single param");
});

router.delete("/delete/:param", (req, res) => {
  res.send("Comments Routes - DELETE single param");
});

module.exports = router;
