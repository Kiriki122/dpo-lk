const axios = require("axios");
const { OneCResponseSchema } = require("./validation/course.schema");
const ApiError = require("../exceptions/api-error");
const { User } = require("../models");

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
        const errorDetails = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");

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
}

module.exports = new OneCService();
