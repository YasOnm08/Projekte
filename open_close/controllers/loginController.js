"use strict";

const jwt = require("jsonwebtoken");
const { mongooseControllerCatch, throwHttpError } = require("../utils/mongooseControllerCatch");
const User = require("../models/userModel");
const uuid = require("uuid");
const iFrameModel = require("../models/iFrameModel");
const ShopHistory = require("../models/shopHistoryModel");
const stripe = require("../utils/stripe");

const getUsers = mongooseControllerCatch(async (req, res) => {
  res.status(200).json(await User.find());
}, "Couldn't fetch all users!");

const getOneUser = mongooseControllerCatch(async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId });

  if (!user) {
    throwHttpError("User doesn't exist!", 404);
  }

  res.status(200).json(user);
}, "Couldn't get user!");

const postUser = mongooseControllerCatch(async (req, res) => {
  req.body.userId = uuid.v7();
  req.body.creationDate = Date.now();
  req.body.isAdmin = false;

  const newUser = await User.create(req.body);

  await iFrameModel.create({ userId: req.body.userId, timezone: "UTC" });

  if (req.body.sessionId) {
    const session = await stripe.getPaySession(req.body.sessionId);

    await ShopHistory.create({
      userId: newUser.userId,
      creationDate: session.created * 1000,
      expirationDate: session.created * 1000 + 1000 * 3600 * 24 * 365,
      cost: session.amount_total,
      currency: session.currency,
      productName: "iFrame",
    });
  }

  res.status(201).json(newUser);
}, "Failed to create user!");

const patchUser = mongooseControllerCatch(async (req, res) => {
  delete req.body.userId;
  delete req.body.creationDate;
  delete req.body.isAdmin;

  const newUser = await User.updateOne({ userId: req.params.userId }, req.body);

  if (!newUser.modifiedCount > 0) {
    throwHttpError("User doesn't exist!", 404);
  }

  res.status(200).json(await User.findOne({ userId: req.params.userId }));
}, "Failed to update user!");

const deleteUser = mongooseControllerCatch(async (req, res) => {
  const deletedUser = await User.deleteOne({ userId: req.params.userId });

  if (!deletedUser.deletedCount > 0) {
    throwHttpError("User doesn't exist!", 404);
  }

  res.status(204).json(await User.findOne({ userId: req.params.userId }));
}, "Failed to delete user!");

const loginUser = mongooseControllerCatch(async (req, res) => {
  const user = await User.findOne({ email: req.body.email || "" });

  if (!user || !(await User.correctPassword(req.body.password, user.password))) throwHttpError("Incorrect email or password!", 403);

  const token = jwt.sign({ email: user.email, userId: user.userId, isAdmin: user.isAdmin, expires: Date.now() + 3600 * 24 * 30 /* 30 days in seconds */ }, process.env.JWT_KEY);

  res.status(200).json({ token });
}, "Failed to login!");

const renewUser = mongooseControllerCatch(async (req, res) => {
  const purchase = await ShopHistory.findOne({ userId: req.params.userId }).sort([["expirationDate", -1]]);

  await ShopHistory.create({
    userId: req.params.userId,
    creationDate: purchase.expirationDate,
    expirationDate: purchase.expirationDate.getTime() + 1000 * 3600 * 24 * 365,
    cost: purchase.cost,
    currency: purchase.currency,
    productName: "iFrame",
  });

  res.status(200).end();
}, "Failed to renew subscriptions for user!");

module.exports = {
  getUsers,
  getOneUser,
  postUser,
  patchUser,
  deleteUser,
  loginUser,
  renewUser,
};
