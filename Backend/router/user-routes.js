const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const handleUploadFaceFile = require("../middlewares/upload-face-middleware");
const { validate } = require("../middlewares/validate");
const { updateFaceSchema } = require("../service/validation/update-face.schema");

const router = new Router();

router.get("/me", authMiddleware, userController.getProfile);
router.patch("/me", authMiddleware, validate(updateFaceSchema), userController.updateFaceInfo);
router.patch("/me/password", authMiddleware, userController.changePassword);
router.post("/me/docs", authMiddleware, handleUploadFaceFile, userController.uploadDocs);

module.exports = router;
