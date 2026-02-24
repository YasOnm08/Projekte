const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
    validate: { validator: (v) => /^#([0-9A-F]{6}|[0-9A-F]{8})$/i.test(v), message: (props) => `${props.value} is not a valid hex color!` },
  },
});

const timeValidator = {
  validator: (v) => {
    if (v === null || v === undefined) return true;
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
  },
  message: (props) => `${props.value} is not a valid time! Expected format: HH:MM`,
};

const iFrameSchema = new mongoose.Schema({
  userId: { type: String, required: [true, "User ID is required"] },
  timezone: { type: String, required: [true, "Time zone is required"] },
  emergencyClosed: {
    closed: { type: Boolean, default: true, required: [true, "closed status is required"] },
    until: { type: String, validate: timeValidator, default: null },
    description: { type: Map, of: String },
  },
  specialDays: [
    {
      name: { type: String, required: [true, "Name is required"], trim: true },
      date: { type: Date, required: [true, "Date is required"] },
      description: { type: Map, of: String },
      openTime: {
        type: [
          {
            closed: { type: Boolean, default: true },
            time: {
              start: { type: String, required: [true, "Start time is required"], validate: timeValidator, default: null },
              end: { type: String, required: [true, "End time is required"], validate: timeValidator, default: null },
            },
          },
        ],
        required: [true, "Opening times for special days are required"],
      },
    },
  ],
  weekPlan: {
    required: [true, "Week plan is required"],
    maxLength: 7,
    type: [
      {
        dayAsNumber: { type: Number, required: [true, "Day is required"], min: 0, max: 6 },
        openTime: {
          type: [
            {
              start: { type: String, required: [true, "Start time is required"], validate: timeValidator, default: null },
              end: { type: String, required: [true, "End time is required"], validate: timeValidator, default: null },
            },
          ],
          required: [true, "Opening times for week plan are required"],
        },
      },
    ],
  },
  styleSettings: {
    font: {
      style: { type: String, enum: ["normal", "italic", "oblique"], default: "normal" },
      size: { type: Number, default: 14 },
      weight: { type: Number, default: 400, min: 100, max: 900 },
    },
    colors: {
      fontColor: { type: colorSchema, default: { color: "#000000" } },
      primaryColor: { type: colorSchema, default: { color: "#1670e6ff" } },
      secondaryColor: { type: colorSchema, default: { color: "#fce29bff" } },
      backgroundColor: { type: colorSchema, default: { color: "#b132c2ff" } },
      openedColor: { type: colorSchema, default: { color: "#35d426ff" } },
      closedColor: { type: colorSchema, default: { color: "#d83838ff" } },
      soonColor: { type: colorSchema, default: { color: "#ffcd29ff" } },
    },
    border: {
      width: { type: Number, default: 1, min: 0 },
      style: { type: String, enum: ["solid", "dashed", "dotted"], default: "solid" },
      weight: { type: Number, default: 400, min: 100, max: 900 },
    },
    shadow: {
      offsetX: { type: Number, default: 0 },
      offsetY: { type: Number, default: 2 },
      blur: { type: Number, default: 4 },
      color: colorSchema,
    },
  },
});

module.exports = mongoose.model("iFrame", iFrameSchema);
