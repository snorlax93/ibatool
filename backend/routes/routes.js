const express = require("express");
const router = express.Router();

//ChangeMe Routes
router.get("/", (req, res) => {
  res.send("ChangeMe Routes - GET default");
});

router.get("/all", (req, res) => {
  res.send("ChangeMe Routes - GET all");
});

router.get("/single/:param", (req, res) => {
  res.send("ChangeMe Routes - GET single param");
});

router.post("/new", (req, res) => {
  res.send("ChangeMe Routes - POST single param");
});

router.patch("/edit/:param", (req, res) => {
  res.send("ChangeMe Routes - PATCH single param");
});

router.delete("/delete/:param", (req, res) => {
  res.send("ChangeMe Routes - DELETE single param");
});

module.exports = router;
