const express = require("express");
const router = express.Router();

//Logs Routes
router.get("/", (req, res) => {
  res.send("Logs Routes - GET default");
});

router.get("/all", (req, res) => {
  res.send("Logs Routes - GET all");
});

router.get("/single/:param", (req, res) => {
  res.send("Logs Routes - GET single param");
});

router.post("/new", (req, res) => {
  res.send("Logs Routes - POST single param");
});

router.patch("/edit/:param", (req, res) => {
  res.send("Logs Routes - PATCH single param");
});

router.delete("/delete/:param", (req, res) => {
  res.send("Logs Routes - DELETE single param");
});

module.exports = router;
