const { Router } = require("express");

const { signup } = require("./controller");

const router = Router();

router.post("/sign-up", signup);
// router.post("/login", login);

module.exports = router;
