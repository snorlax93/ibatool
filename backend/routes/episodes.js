const express = require("express");
const router = express.Router();

//Episode Routes
router.get("/", (req, res) => {
  res.send("Episode Routes - GET default");
});

router.get("/all", (req, res) => {
  res.send("Episode Routes - GET all");
});

router.get("/single/:param", (req, res) => {
  res.send("Episode Routes - GET single param");
});

router.post("/new", (req, res) => {
  res.send("Episode Routes - POST single param");
});

router.patch("/edit/:param", (req, res) => {
  res.send("Episode Routes - PATCH single param");
});

router.delete("/delete/:param", (req, res) => {
  res.send("Episode Routes - DELETE single param");
});

module.exports = router;
