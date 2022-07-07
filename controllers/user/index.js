const User = require("../../models/user");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { createOne } = require("../handlerFactory");

exports.createUser = createOne(User, true);
