"use strict";

const iFrame = require("../models/iFrameModel");
const { mongooseControllerCatch, throwHttpError } = require("../utils/mongooseControllerCatch");

const getAlliFrames = mongooseControllerCatch(async (req, res) => {
  const data = await iFrame.find();
  res.status(200).json({ data: data });
}, "Couldn't fetch all iFrames!");

const createiFrame = mongooseControllerCatch(async (req, res) => {
  req.body.userId = req.params.userId;
  const newiFrame = await iFrame.create(req.body);
  res.status(201).json({ data: { newiFrame } });
}, "Failed to create iFrame!");

const getiFrameById = mongooseControllerCatch(async (req, res) => {
  const userId = req.params.userId;
  const data = await iFrame.findOne({ userId: userId }).exec();
  if (!data) {
    throwHttpError("iFrame not found", 404);
  }
  res.status(200).json({ data: data });
}, "Couldn't fetch iFrame!");

const updateiFrameById = mongooseControllerCatch(async (req, res) => {
  const userId = req.params.userId;
  const data = await iFrame.updateOne({ userId: userId }, req.body, { runValidators: true }).exec();
  if (!data) {
    throwHttpError("iFrame not found", 404);
  }
  res.status(201).json(await iFrame.findOne({ userId: userId }).exec());
}, "Failed to update iFrame!");

const deleteiFrameById = mongooseControllerCatch(async (req, res) => {
  const userId = req.params.userId;
  await iFrame.deleteOne({ userId: userId }).exec();
  res.status(204).send({ msg: "iFrame deleted" });
}, "Failed to delete iFrame!");

module.exports = {
  getAlliFrames,
  createiFrame,
  getiFrameById,
  updateiFrameById,
  deleteiFrameById,
};
