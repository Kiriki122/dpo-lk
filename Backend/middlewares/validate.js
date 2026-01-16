const { ZodError } = require("zod");
const ApiError = require("../exceptions/api-error");

/**
 * Преобразует ошибку Zod в массив объектов формата { field, message }.
 * @param {ZodError} error - Объект ошибки Zod.
 * @returns {Array<{field: string, message: string}>} - Массив с ошибками.
 */
const formatZodErrors = (error) => {
  return error.issues.map((issue) => ({
    field: issue.path.slice(1).join("."),
    message: issue.message,
  }));
};

/**
 * Создает middleware-функцию для Express, которая валидирует входящий запрос
 * (req.body, req.query, req.params) с помощью предоставленной схемы Zod.
 *
 * В случае ошибки валидации, форматирует ее с помощью `formatZodErrors` и передает
 * в следующий обработчик ошибок как экземпляр `ApiError.BadRequest`.
 * Остальные типы ошибок пробрасываются дальше без изменений.
 *
 * @param {import('zod').AnyZodObject} schema - Схема Zod, которая будет применяться к объекту `{ body, query, params }`.
 * @returns {import('express').RequestHandler} Возвращает Express middleware для использования в роутах.
 *
 * @example
 * // В файле роутов
 * const { validate } = require('./middlewares/validate-middleware');
 * const { userSchema } = require('./schemas/user-schemas');
 *
 * router.post('/users', validate(userSchema), userController.create);
 */
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = formatZodErrors(err);
      next(ApiError.BadRequest("Ошибка валидации", errors));
    } else {
      next(err);
    }
  }
};

module.exports = { validate };
