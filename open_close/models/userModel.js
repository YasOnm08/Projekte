const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const coordinateSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: [true, "A coordinate must have a latitude."] },
    longitude: { type: Number, required: [true, "A coordinate must have a longitude."] },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  userId: { type: String, required: [true, "A user must have an id."], unique: true, trim: true },
  creationDate: { type: Date, required: [true, "A user must have a creation date."], unique: true },
  email: { type: String, required: [true, "A user must have an email."], unique: true, trim: true, lowercase: true, validate: [validator.isEmail, "Invalid email"] },
  password: { type: String, required: [true, "A user must have a password."] },
  company: { type: String, required: [true, "A user must have an associated company."], trim: true },
  name: { type: String, required: [true, "A user must have a name."], trim: true },
  surname: { type: String, required: [true, "A user must have a surname."], trim: true },
  street: { type: String, required: [true, "A user must have a street."], trim: true },
  postalCode: { type: String, required: [true, "A user must have a postal code."], trim: true },
  city: { type: String, required: [true, "A user must have a city."], trim: true },
  country: { type: String, required: [true, "A user must have a country."], trim: true },
  phoneNumber: { type: String, required: [true, "A user must have a phone number."], trim: true },
  coordinates: { type: coordinateSchema, required: [true, "A user must have coordinates."] },
  isAdmin: { type: Boolean, required: [true, "A user must have an admin status."] },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.statics.correctPassword = function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
