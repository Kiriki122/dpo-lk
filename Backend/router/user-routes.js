const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/me", authMiddleware, userController.getProfile);

module.exports = router;
