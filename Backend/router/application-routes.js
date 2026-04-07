const Router = require("express").Router;
const applicationController = require("../controllers/application-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post("/", authMiddleware, applicationController.createApplication);

module.exports = router;
