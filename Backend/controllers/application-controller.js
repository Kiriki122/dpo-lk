const ApplicationDto = require("../dtos/application-dto");
const oneCService = require("../service/oneC-service");

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
}

module.exports = new ApplicationController();
