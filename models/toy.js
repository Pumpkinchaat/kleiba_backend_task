const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const toySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of Toy is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Type of toy is required"],
  },
  price: {
    type: Number,
    validate: [
      function (v) {
        if (v < 0) return false;
        else return true;
      },
      "The price needs to be positive",
    ],
    required: [true, "Price of toy is required"],
  },
  manufacturer: {
    type: String,
    required: [true, "The name of manufacturer is required"],
  },
  timeOfManufacture: {
    type: Date,
    validate: [
      function (v) {
        if (new Date(v) > new Date(Date.now())) return false;
        else return true;
      },
      "Future date of manufacture is NOT possible",
    ],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Toy", toySchema);
