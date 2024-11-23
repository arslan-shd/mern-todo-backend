const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default to current date and time
  },
  // user_id: {
  //   type: String,
  //   required: true,
  // },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  reminder: {
    type: Date,
  }, // When the reminder should trigger

  notified: {
    type: Boolean,
    default: false,
  }, // Prevent duplicate notifications

  subscription: {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
