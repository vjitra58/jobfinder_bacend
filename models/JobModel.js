import mongoose from "mongoose";

const schema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
  },
  logo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  position: {
    type: String,
    required: [true, "Please add a position"],
  },
  salary: {
    type: String,
    required: [true, "Please add a salary"],
  },
  vacancy : {
    type: String,
    required: [true, "Please add a vacancy"],
  },
  jobType: {
    type: String,
    enum: [
      "Full Time",
      "Part Time",
      "Contract",
      "Internship",
      "Temporary",
      "Volunteer",
      "Other",
    ],
    default: "Full Time",
  },
  workFrom: {
    type: String,
    enum: ["Office", "Home", "Hybrid"],
    default: "Office",
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: 5000,
  },
  skills: {
    type: [String],
    required: [true, "Please add skills"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Job =  mongoose.model("Job", schema);