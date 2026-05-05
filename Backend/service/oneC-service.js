const axios = require("axios");
const { OneCResponseSchema } = require("./validation/course.schema");
const ApiError = require("../exceptions/api-error");
const { User } = require("../models");
const { z } = require("zod");

class OneCService {
  constructor() {
    this.baseUrl = process.env.ONEC_URL;
    this.auth = {
      username: process.env.ONEC_USER,
      password: process.env.ONEC_PASSWORD,
    };
  }

  async fetchCourses() {
    try {
      console.log("Запрос курсов из 1С 🛫");
      const response = await axios.get(`${this.baseUrl}/courses`, {
        auth: this.auth,
        timeout: 10000,
      });

      const validatedData = OneCResponseSchema.parse(response.data);

      console.log(`Получено ${validatedData.length} курсов из 1С.`);
      return validatedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "No Status";
        const statusText = error.response?.statusText || "Сервер не доступен";
        throw new Error(`Ошибка HTTP запроса к 1С: ${status} ${statusText}. ${error.message}`);
      }

      if (error instanceof z.ZodError) {
        const errorDetails = error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");

        throw new Error(`Данные из 1С не соответствуют схеме: ${errorDetails}`);
      }

      throw error;
    }
  }

  async createApplication(course_uid, student_fio, phone, email) {
    if (!course_uid || !student_fio || !phone || !email) {
      throw ApiError.BadRequest("Поля course_uid, student_fio, phone, email обязательные для заполнения");
    }
    try {
      const response = await axios.post(
        `${this.baseUrl}/applications`,
        { course_uid, student_fio, phone, email },
        { auth: this.auth }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "No Status";
        const statusText = error.response?.statusText || "Сервер не доступен";
        throw ApiError.BadGateway(`Ошибка HTTP запроса к 1С: ${status} ${statusText}. ${error.message}`);
      }
      throw error;
    }
  }

  async getUserApplications(user) {
    if (!user.id) {
      throw ApiError.BadRequest();
    }
    const userData = await User.findByPk(user.id);
    if (!userData) {
      throw ApiError.NotFound("Пользователь не найден");
    }
    try {
      const response = await axios.post(
        `${this.baseUrl}/applications/me`,
        { email: userData.email },
        { auth: this.auth }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "No Status";
        const statusText = error.response?.statusText || "Сервер не доступен";
        throw ApiError.BadGateway(`Ошибка HTTP запроса к 1С: ${status} ${statusText}. ${error.message}`);
      }
      throw error;
    }
  }

  async uploadFilesToApplication(DocNumber, Files) {
    if (!DocNumber) {
      throw ApiError.BadRequest("Отсутствует номер документа (DocNumber)");
    }
    if (!Files || Files.length === 0) {
      throw ApiError.BadRequest("Отсутствуют файлы для загрузки (Files)");
    }

    try {
      const endpoint = `${this.baseUrl}/applications/files`;

      const payload = {
        DocNumber,
        Files,
      };

      const response = await axios.post(endpoint, payload, { auth: this.auth });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "No Status";
        const statusText = error.response?.statusText || "Сервер не доступен";

        throw ApiError.BadGateway(
          `Ошибка HTTP запроса к 1С при загрузке файлов: ${status} ${statusText}. ${error.message}.`
        );
      }

      throw error;
    }
  }

  async getApplicationDocuments(DocNumber) {
    if (!DocNumber) {
      throw ApiError.BadRequest("Отсутствует номер документа (DocNumber)");
    }

    try {
      const response = await axios.get(`${this.baseUrl}/applications/download?number=${DocNumber}`, {
        auth: this.auth,
        responseType: "stream",
      });

      const cdHeader = response.headers["content-disposition"];
      let fileName = "";

      if (cdHeader) {
        // 1. Сначала ищем современный формат: filename*=UTF-8''...
        const matchStar = cdHeader.match(/filename\*=UTF-8''([^;]+)/i);
        if (matchStar && matchStar[1]) {
          // Декодируем URL-строку (например, %D0%B0 -> а)
          fileName = decodeURIComponent(matchStar[1]);
        } else {
          // 2. Если нет со звездочкой, ищем обычный filename="..."
          const matchPlain = cdHeader.match(/filename="?([^";]+)"?/i);
          if (matchPlain && matchPlain[1]) {
            // Чиним кодировку Latin1 -> UTF8 для старого формата
            fileName = Buffer.from(matchPlain[1], "binary").toString("utf8");
          }
        }
      }

      response.parsedFileName = fileName || `Заявка_${DocNumber}.pdf`;

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw ApiError.NotFound("Документ еще не создан. Попробуйте повторить попытку позже.");
        }
        const status = error.response?.status || "No Status";
        const statusText = error.response?.statusText || "Сервер не доступен";
        throw ApiError.BadGateway(`Ошибка HTTP запроса к 1С: ${status} ${statusText}. ${error.message}`);
      }
      throw error;
    }
  }

  async updateFaceData(data) {
    try {
      const response = await axios.post(`${this.baseUrl}/updateUserData`, data, { auth: this.auth });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "No Status";
        const statusText = error.response?.statusText || "Сервер не доступен";
        throw ApiError.BadGateway(`Ошибка HTTP запроса к 1С: ${status} ${statusText}. ${error.message}`);
      }
    }
  }

}

module.exports = new OneCService();
