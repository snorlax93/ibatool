const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  quickLink: {
    required: false,
    type: String,
    unique: true
  },
  uploader: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
    unique: true
  },
  ranking: {
    required: false,
    type: Number,
  },
  veto: {
    required: false,
    type: Number,
  },
  content: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("topics", schema);
