const express = require("express");
const router = express.Router();

//Categories Routes
router.get("/", (req, res) => {
  res.send("Categories Routes - GET default");
});

router.get("/all", (req, res) => {
  res.send("Categories Routes - GET all");
});

router.get("/single/:param", (req, res) => {
  res.send("Categories Routes - GET single param");
});

router.post("/new", (req, res) => {
  res.send("Categories Routes - POST single param");
});

router.patch("/edit/:param", (req, res) => {
  res.send("Categories Routes - PATCH single param");
});

router.delete("/delete/:param", (req, res) => {
  res.send("Categories Routes - DELETE single param");
});

module.exports = router;
