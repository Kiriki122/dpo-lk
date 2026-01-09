const { Course, CourseModule, sequelize } = require("../models");
const OneCService = require("./oneC-service");
const CourseDto = require("../dtos/course-dto");

class CourseService {
  /**
   * Основной метод синхронизации.
   * Вызывается по таймеру.
   */
  async syncWith1C() {
    const t = await sequelize.transaction();

    try {
      const coursesFrom1C = await OneCService.fetchCourses();

      for (const item of coursesFrom1C) {
        // Ищем или создаем курс по ID из 1С
        // Используем поле onec_id для поиска
        let [course, created] = await Course.findOrCreate({
          where: { onec_id: item.id },
          defaults: {
            name: item.name,
            hours: item.hours,
            description: item.description,
            goals: item.goals,
            knowledge: item.knowledge,
            mode: item.mode,
            category: item.category,
            duration: item.duration,
            qualification: item.qualification,
            specialty: item.specialty,
            isTrainingProgram: item.isTrainingProgram,
          },
          transaction: t,
        });

        // Если курс уже был, обновляем его
        if (!created) {
          await course.update(
            {
              name: item.name,
              hours: item.hours,
              description: item.description,
              goals: item.goals,
              knowledge: item.knowledge,
              mode: item.mode,
              category: item.category,
              duration: item.duration,
              qualification: item.qualification,
              specialty: item.specialty,
              isTrainingProgram: item.isTrainingProgram,
            },
            { transaction: t }
          );
        }

        // Перезаписываем модули
        // Сначала удаляем старые
        await CourseModule.destroy({
          where: { courseId: course.id },
          transaction: t,
        });

        // Добавляем новые, если есть
        if (item.modules && item.modules.length > 0) {
          const modulesPayload = item.modules.map((mod, index) => ({
            courseId: course.id,
            title: mod.title,
            hours: mod.hours,
            order: index,
          }));

          await CourseModule.bulkCreate(modulesPayload, { transaction: t });
        }
      }

      await t.commit();
      console.log("🎉 Синхронизация успешно завершена.");
      return true;
    } catch (error) {
      await t.rollback();
      console.error("❌ СБОЙ СИНХРОНИЗАЦИИ:", error.message);
      return false;
    }
  }

  async getCourses() {
    const courses = await Course.findAll({
      include: [
        {
          model: CourseModule,
          as: "modules",
        },
      ],
      order: [
        ["name", "ASC"],
        [{ model: CourseModule, as: "modules" }, "order", "ASC"],
      ],
    });

    return courses.map((course) => new CourseDto(course));
  }

  async getById(id) {
    const course = await Course.findByPk(id, {
      include: [
        {
          model: CourseModule,
          as: "modules",
        },
      ],
      order: [[{ model: CourseModule, as: "modules" }, "order", "ASC"]],
    });

    if (!course) {
      return null;
    }

    return new CourseDto(course);
  }
}

module.exports = new CourseService();
