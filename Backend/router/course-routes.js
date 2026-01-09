const Router = require("express").Router;
const CourseController = require("../controllers/course-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const oneCAuthMiddleware = require("../middlewares/oneC-auth-middleware");

const router = new Router();

router.get("/", authMiddleware, CourseController.getCourses);

router.get("/:id", authMiddleware, CourseController.getCourseById);

router.post("/sync", oneCAuthMiddleware, CourseController.forceSync);

module.exports = router;
