const Router = require("express").Router;
const userRouter = require("./user-routes");
const coursesRouter = require("./course-routes");

const router = new Router();

router.use("/users", userRouter);
router.use("/courses", coursesRouter);

module.exports = router;
