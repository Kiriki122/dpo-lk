const userService = require("../service/user-service");
const oneCService = require("../service/oneC-service");
const { UploadFaceFilesSchema } = require("../service/validation/upload-files.schema");
const path = require("node:path");
const ApiError = require("../exceptions/api-error");

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userData = await userService.changePassword(req.user.id, oldPassword, newPassword);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.json({ user: userData.user, accessToken: userData.accessToken });
    } catch (e) {
      next(e);
    }
  }

  async updateFaceInfo(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.id);
      if (!user) throw ApiError.NotFound("Пользователь не найден");
      const { email, birthDate = null, snils = null, passport = null, registrationAddress = null } = req.body;

      const payload = {};
      payload.email = email;
      if (birthDate) payload.birthDate = birthDate;
      if (snils) payload.snils = snils;
      if (passport) Object.assign(payload, passport);
      if (registrationAddress) payload.registrationAddress = registrationAddress;

      await oneCService.updateFaceData(payload);
      res.json({ message: "Данные обновлены" });
    } catch (error) {
      next(error);
    }
  }

  async uploadDocs(req, res, next) {
    try {
      const { email } = req.body;

      if (!req.files || req.files.length === 0) {
        throw ApiError.BadRequest("Файлы не были загружены");
      }

      const filesData = req.files.map((file) => {
        const correctName = Buffer.from(file.originalname, "latin1").toString("utf8");
        const name = path.basename(correctName, path.extname(correctName));
        const ext = path.extname(correctName).replace(".", "");

        return {
          FileName: name,
          Extension: ext,
          Base64Data: file.buffer.toString("base64"),
          DocumentType: "ДокументУдостоверяющийЛичность",
        };
      });

      const payload = {
        email,
        Files: filesData,
      };

      const validationResult = UploadFaceFilesSchema.safeParse(payload);

      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues.map((err) => err.message).join(", ");
        throw ApiError.BadRequest(`Ошибка валидации`, [errorMessage]);
      }

      const { email: validEmail, Files: validFiles } = validationResult.data;

      const result = await oneCService.uploadFaceDocuments(validEmail, validFiles);

      return res.status(200).json({ message: "Документы загружены" });
    } catch (error) {}
  }
}

module.exports = new UserController();
