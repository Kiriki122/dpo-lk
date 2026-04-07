const Router = require("express").Router;
const authRouter = require("./auth-routes");
const userRouter = require("./user-routes");
const coursesRouter = require("./course-routes");
const applicationRoute = require("./application-routes");

const router = new Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/courses", coursesRouter);
router.use("/applications", applicationRoute);

module.exports = router;
