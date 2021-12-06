const { Router, request } = require("express");
const { protectAdmin, protect } = require("../../utils/authentication");

const {
  getAllGames,
  createGame,
  getGameWithUSers,
  joinGame,
} = require("./controller");

const router = Router();

router.get("/", protectAdmin, getAllGames);

router.get("/:id", getGameWithUSers);

router.patch("/:id/join", joinGame);

router.post("/", protect, createGame);

module.exports = router;
