const multer = require("multer");
const ApiError = require("../exceptions/api-error");
const { UploadRequestSchema } = require("../service/validation/upload-request.shcema");
const { z } = require("zod");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/jpg"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = `Недопустимый формат файла (${file.originalname}). Разрешены только .pdf и .jpg`;
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Ограничение в 10 МБ
  },
  fileFilter: fileFilter,
});

const uploadMiddleware = upload.array("files", 10); // Максимум 10 файлов за раз

const handleUpload = (req, res, next) => {
  return uploadMiddleware(req, res, (err) => {
    if (req.fileValidationError) {
      return next(ApiError.BadRequest(req.fileValidationError));
    }

    if (err instanceof multer.MulterError) {
      // Ошибки самого Multer
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(ApiError.BadRequest("Размер файла не должен превышать 10 МБ"));
      }
      return next(ApiError.BadRequest(err.message));
    }
    if (err) {
      return next(ApiError.BadRequest(err.message));
    }

    try {
      if (!req.files || req.files.length === 0) {
        return next(ApiError.BadRequest("Должен быть загружен хотя бы один файл"));
      }

      UploadRequestSchema.parse({
        body: req.body,
        files: req.files,
      });

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((e) => e.message);
        return next(ApiError.BadRequest("Ошибка валидации полей запроса", errorMessages));
      }
      return next(ApiError.BadRequest(error.message));
    }
  });
};

module.exports = handleUpload;
