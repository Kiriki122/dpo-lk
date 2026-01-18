const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/me", authMiddleware, userController.getProfile);
router.patch("/me/password", authMiddleware, userController.changePassword);

module.exports = router;
