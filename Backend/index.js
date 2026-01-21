require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models");
const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");
const notFoundMiddleware = require("./middlewares/not-found-middleware");

const initScheduledJobs = require("./jobs/cron-jobs");
const CourseService = require("./service/course-service");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await db.sequelize.authenticate().then(() => console.log("Connection has been established successfully."));
    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
    }

    initScheduledJobs();
    CourseService.syncWith1C();

    app.listen(PORT, () => {
      console.log(`Server started on PORT = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
