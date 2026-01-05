const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");

const router = new Router();

const registrationValidation = [
  body("firstName").isLength({ min: 2, max: 32 }),
  body("lastName").isLength({ min: 2, max: 32 }),
  body("middleName").isLength({ min: 2, max: 32 }).optional(),
  body("email").isEmail(),
  body("phone").isMobilePhone("ru-RU"),
  body("password").isLength({ min: 3, max: 32 }),
];

router.post("/registration", registrationValidation, userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

module.exports = router;
