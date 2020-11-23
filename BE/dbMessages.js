const mongoose = require("mongoose");

const appSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

module.exports = mongoose.model("messagecontents", appSchema);
