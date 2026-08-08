const express = require("express");

const { InfoController } = require("../../controllers");
const userRoute = require("./userRoute");

const router = express.Router();

router.use("/info", InfoController.info);
router.use("/user", userRoute);

module.exports = router;
