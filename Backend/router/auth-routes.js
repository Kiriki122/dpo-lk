const Router = require("express").Router;
const { validate } = require("../middlewares/validate");
const { RegistrationSchema } = require("../service/validation/registration.schema");
const authController = require("../controllers/auth-controller");
const oneCAuthMiddleware = require("../middlewares/oneC-auth-middleware");
const { loginSchema } = require("../service/validation/login.schema");

const router = new Router();

router.post("/registration", oneCAuthMiddleware, validate(RegistrationSchema), authController.registration);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;
