const ApiError = require("../exceptions/api-error");

module.exports = function (req, res, next) {
  return next(ApiError.NotFound());
};
