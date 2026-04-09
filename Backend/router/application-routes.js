const Router = require("express").Router;
const applicationController = require("../controllers/application-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { ApplicationSchema } = require("../service/validation/application.schema");
const { validate } = require("../middlewares/validate");

const router = new Router();

router.post("/", authMiddleware, validate(ApplicationSchema), applicationController.createApplication);

module.exports = router;
