const AppError = require("../../utils/appError");
const Toy = require("../../models/toy");
const { createOne, updateOne } = require("../handlerFactory");
const catchAsync = require("../../utils/catchAsync");

exports.createToy = catchAsync(async (req, res, next) => {
  const { name, type, price, manufacturer, timeOfManufacture } = req.body;

  if (!name || !type || !price || !manufacturer || !timeOfManufacture)
    return next(new AppError("One or Many fields empty", 400));

  //loading the creator onto req.body
  req.body.creator = req.userID;

  createOne(Toy)(req, res, next);
});

exports.modifyToy = catchAsync(async (req, res, next) => {
  const { name, type, price, manufacturer, timeOfManufacture } = req.body;

  if (!name || !type || !price || !manufacturer || !timeOfManufacture)
    return next(new AppError("One or Many fields empty", 400));

  //loading the creator onto req.body
  req.body.creator = req.userID;

  updateOne(Toy)(req, res, next);
});

exports.checkAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const toy = await Toy.findById(id).populate("creator");
  if (!toy) return next(new AppError("Toy Not found", 404));

  if (!toy.creator._id.equals(req.userID))
    return next(new AppError("Forbidden Access", 403));

  next();
});
