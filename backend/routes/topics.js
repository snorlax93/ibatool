const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Put all logic in the controller
const Controller = require("../controller/topics");

router.get("/", (req, res) => {
  res.send("Topics Routes - GET default");
});

router.get("/all", async (req, res) => {
  await Controller.getTopic("all", {}, res);
});

router.get("/single/:flag/:param", async (req, res) => {
  await Controller.getTopic(req.params.flag, req.params.param, res);
});

router.post("/new", jsonParser, async (req, res) => {
  await Controller.addTopic(req.body, res);
});

router.patch("/edit/:param", jsonParser, async (req, res) => {
  let data = {};
  for (const [key, value] of Object.entries(req.body)) {
    data[key] = value;
  }
  await Controller.editTopic(req.params.param, data, res);
});

router.delete("/delete/:param", async (req, res) => {
  await Controller.deleteTopic(req.params.param, res);
});

module.exports = router;
