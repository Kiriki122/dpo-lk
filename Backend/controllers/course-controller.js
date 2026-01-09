const CourseService = require("../service/course-service");

class CourseController {
  async getCourses(req, res, next) {
    try {
      const courses = await CourseService.getCourses();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CourseService.getById(id);

      if (!course) {
        return res.status(404).json({ message: "Курс не найден" });
      }

      res.json(course);
    } catch (error) {
      next(error);
    }
  }

  // Для ручного запуска синхронизации
  // POST /api/courses/sync
  async forceSync(req, res) {
    const result = await CourseService.syncWith1C();
    if (result) {
      res.json({ message: "Синхронизация успешно завершена" });
    } else {
      res.status(500).json({ message: "Ошибка синхронизации" });
    }
  }
}

module.exports = new CourseController();
