import mongoose from "mongoose";

const categories = ["Work", "Personal", "Study", "Health", "Other"];
const statuses = ["pending", "in-progress", "completed"];

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [140, "Title cannot exceed 140 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      default: "",
    },
    priority: {
      type: Number,
      min: [1, "Priority must be at least 1"],
      max: [5, "Priority cannot exceed 5"],
      default: 3,
    },
    category: {
      type: String,
      enum: categories,
      default: "Other",
    },
    deadline: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: statuses,
      default: "pending",
    },
    aiSuggested: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TASK_CATEGORIES = categories;
export const TASK_STATUSES = statuses;
export default mongoose.model("Task", taskSchema);
