module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static Forbidden() {
    return new ApiError(403, "Доступ запрещен");
  }

  static NotFound() {
    return new ApiError(404, "Такого маршрута не существует");
  }

  static Conflict(message, errors = []) {
    return new ApiError(409, message, errors);
  }

  static BadGateway(message = "Внешний сервис временно недоступен", errors = []) {
    return new ApiError(502, message, errors);
}
};
