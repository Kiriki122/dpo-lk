const Router = require("express").Router;
const { validate } = require("../middlewares/validate");
const { registrationSchema } = require("../service/validation/user.schema");
const authController = require("../controllers/auth-controller");
const oneCAuthMiddleware = require("../middlewares/oneC-auth-middleware");

const router = new Router();

router.post("/registration", oneCAuthMiddleware, validate(registrationSchema), authController.registration);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;
