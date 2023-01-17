import mongoose from "mongoose";
const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  creationTime: {
    type: Date,
    default: Date.now,
  },

  completed: {
    type: Boolean,
    default: false,
  },
  completedTime: {
    type: Date,
    default: null,
  },

  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Task", quoteSchema);
