const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/login", userController.login);
router.post(
  "/registration",
  body("firstName").isLength({ min: 2, max: 32 }),
  body("lastName").isLength({ min: 2, max: 32 }),
  body("middleName").isLength({ min: 2, max: 32 }).optional(),
  body("email").isEmail(),
  body("phone").isMobilePhone("ru-RU"),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
