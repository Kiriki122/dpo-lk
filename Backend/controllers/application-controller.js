const ApplicationDto = require("../dtos/application-dto");
const ApiError = require("../exceptions/api-error");
const oneCService = require("../service/oneC-service");
const { UploadFilesSchema } = require("../service/validation/upload-files.schema");
const path = require("node:path");

class ApplicationController {
  async createApplication(req, res, next) {
    try {
      const { course_uid, student_fio, phone, email } = req.body;

      const registrationData = await oneCService.createApplication(course_uid, student_fio, phone, email);
      return res.status(201).json(registrationData);
    } catch (e) {
      next(e);
    }
  }

  async getApplications(req, res, next) {
    try {
      const applications = await oneCService.getUserApplications(req.user);
      const response = applications.map((application) => new ApplicationDto(application));
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async uploadFiles(req, res, next) {
    try {
      const { DocNumber } = req.body;

      if (!req.files || req.files.length === 0) {
        throw ApiError.BadRequest("Файлы не были загружены");
      }

      const filesData = req.files.map((file) => {
        const correctName = Buffer.from(file.originalname, "latin1").toString("utf8");
        const ext = path.extname(correctName).replace(".", "");
        const name = path.basename(correctName, path.extname(correctName));

        return {
          FileName: name,
          Extension: ext,
          Base64Data: file.buffer.toString("base64"),
        };
      });

      const payload = {
        DocNumber,
        Files: filesData,
      };

      const validationResult = UploadFilesSchema.safeParse(payload);

      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues.map((err) => err.message).join(", ");
        throw ApiError.BadRequest(`Ошибка валидации`, [errorMessage]);
      }

      const { DocNumber: validDocNumber, Files: validFiles } = validationResult.data;

      const result = await oneCService.uploadFilesToApplication(validDocNumber, validFiles);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getApplicationDocuments(req, res, next) {
    try {
      const { DocNumber } = req.body;
      const documents = await oneCService.getApplicationDocuments(DocNumber);
      const fileName = documents.parsedFileName || `application_doc_${DocNumber}.pdf`;
      const encodedName = encodeURI(fileName);
      res.set({
        "Content-Type": documents.headers["content-type"],
        "Content-Disposition": `attachment; filename="${encodedName}"; filename*=UTF-8''${encodedName}`,
        "Content-Length": documents.headers["content-length"],
      });
      return documents.data.pipe(res);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ApplicationController();
