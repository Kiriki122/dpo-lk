const Router = require("express").Router;
const userRouter = require("./user-routes");

const router = new Router();

router.use("/users", userRouter);

module.exports = router;
