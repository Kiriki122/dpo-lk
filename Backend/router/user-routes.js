const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const oneCAuthMiddleware = require("../middlewares/oneC-auth-middleware");
const { validate } = require("../middlewares/validate");
const { registrationSchema } = require("../service/validation/user.schema");

const router = new Router();

router.post("/registration", oneCAuthMiddleware, validate(registrationSchema), userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

module.exports = router;
