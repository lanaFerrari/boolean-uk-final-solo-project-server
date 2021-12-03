const { Router, request } = require("express");
const { protectAdmin } = require("../../utils/authentication");

const { getAllGames, createGame } = require("./controller");

const router = Router();

router.get("/", getAllGames);

router.post("/", createGame);

module.exports = router;
