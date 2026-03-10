const express = require("express");
const cors = require("cors");
const taskModel = require("./models/tasks.model");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("./public"));

// Create
app.post("/api/tasks", async (req, res) => {
  const { title } = req.body || {};
  const { content } = req.body || {};

  const tasks = await taskModel.create({
    title,
    content,
  });

  res.status(201).json({ message: "Task created successfully", tasks });
});

// Read
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await taskModel.find();

    res.status(200).json({ message: "All tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Something went wrong", error);
  }
});

// Update - Patch
app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const tasks = await taskModel.findByIdAndUpdate(
    id,
    { title, content },
    { returnDocument: "after" },
  );

  if (!tasks) return res.status(404).json({ message: "Task ID not found." });

  res.status(200).json({ message: "This task is updated successfully", tasks });
});

// Delete
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const tasks = await taskModel.findByIdAndDelete(id);

  if (!tasks) return res.status(404).json({ message: "Task ID not found" });

  res.status(200).json({ message: "This Task is deleted successfully", tasks });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
