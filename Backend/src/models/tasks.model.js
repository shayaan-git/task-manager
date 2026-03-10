const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = taskModel;
