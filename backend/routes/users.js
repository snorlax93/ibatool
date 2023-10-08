const express = require("express");
const router = express.Router();

//Users Routes
router.get("/", (req, res) => {
  res.send("Users Routes - GET default");
});

router.get("/all", (req, res) => {
  res.send("Users Routes - GET all");
});

router.get("/single/:param", (req, res) => {
  res.send("Users Routes - GET single param");
});

router.post("/new", (req, res) => {
  res.send("Users Routes - POST single param");
});

router.patch("/edit/:param", (req, res) => {
  res.send("Users Routes - PATCH single param");
});

router.delete("/delete/:param", (req, res) => {
  res.send("Users Routes - DELETE single param");
});

module.exports = router;
