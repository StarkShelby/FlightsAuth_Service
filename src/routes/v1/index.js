const express = require("express");

const { InfoController } = require("../../controllers");
const userRoute = require("./userRoute");
const { AuthMiddleware } = require("../../middlewares");

const router = express.Router();

router.use("/info", AuthMiddleware.checkAuth, InfoController.info);
router.use("/user", userRoute);

module.exports = router;
