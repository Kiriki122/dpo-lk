const ApiError = require("../exceptions/api-error");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    const credentials = Buffer.from(token, "base64").toString("utf-8");

    const [login, password] = credentials.split(":");

    if (login !== process.env.ONEC_USER || password !== process.env.ONEC_PASSWORD) {
      return next(ApiError.Forbidden());
    }

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
