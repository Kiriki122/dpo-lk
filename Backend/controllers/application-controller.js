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
}

module.exports = new ApplicationController();
