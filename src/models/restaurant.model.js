const mongoose = require("mongoose");
const { DB_COLLECTIONS } = require("../constants");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    tag: [String],
    closeAt: { type: Date },
    minimum: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    contact: {
      type: String,
      minLength: [10, "Must be at least 10 digits"],
      maxLength: [12, "Must enter equal or less than 12 digits"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(DB_COLLECTIONS.RESTAURANT, restaurantSchema);
