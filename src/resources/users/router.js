const { Router, request } = require("express");
const { protect } = require("../../utils/authentication");

const { getProfile } = require("./controller");

const router = Router();

router.get("/profile", protect, getProfile);

module.exports = router;
