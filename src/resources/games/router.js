const { Router, request } = require("express");
const { protectAdmin, protect } = require("../../utils/authentication");

const {
  getAllGames,
  createGame,
  getGameWithUSers,
  joinGame,
} = require("./controller");

const router = Router();

router.get("/", protect, getAllGames);

router.get("/:id", protect, getGameWithUSers);

router.put("/:id/join", protect, joinGame);

router.post("/", protect, createGame);

module.exports = router;
