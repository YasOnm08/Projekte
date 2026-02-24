const mongoose = require("mongoose");

const shopHistorySchema = new mongoose.Schema({
  userId: { type: String, required: [true, "A user must have an ID"], trim: true },
  creationDate: { type: Date, required: [true, "An entry must have a expiration date."] },
  expirationDate: { type: Date, required: [true, "An entry must have a creation date."] },
  cost: { type: Number, required: [true, "An entry must have a cost"], trim: true },
  currency: { type: String, required: [true, "An entry must have a currency"], trim: true },
  productName: { type: String, trim: true },
});

module.exports = mongoose.model("ShopHistory", shopHistorySchema);
