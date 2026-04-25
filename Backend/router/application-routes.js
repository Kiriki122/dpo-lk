const Router = require("express").Router;
const applicationController = require("../controllers/application-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { ApplicationSchema } = require("../service/validation/application.schema");
const { validate } = require("../middlewares/validate");
const handleUpload = require("../middlewares/upload-middleware");

const router = new Router();

router.post("/", authMiddleware, validate(ApplicationSchema), applicationController.createApplication);
router.get("/me", authMiddleware, applicationController.getApplications);
router.post("/upload-files", authMiddleware, handleUpload, applicationController.uploadFiles);
router.post("/download-file", authMiddleware, applicationController.getApplicationDocuments);

module.exports = router;
