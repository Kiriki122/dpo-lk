const cron = require("node-cron");
const CourseService = require("../service/course-service");

function initScheduledJobs() {
  // Запуск каждый день в 03:00 ночи
  cron.schedule("0 3 * * *", async () => {
    const date = new Date();
    const moscowDate = date.toLocaleDateString("ru-RU", { timeZone: "Europe/Moscow" });
    console.log(`⏳ Запуск плановой синхронизации с 1С ${moscowDate} в ${date.getHours()}:${date.getMinutes()}`);
    await CourseService.syncWith1C();
  });

  console.log("📅 Планировщик задач запущен");
}

module.exports = initScheduledJobs;
