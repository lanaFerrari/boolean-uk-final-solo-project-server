const { Router, request } = require("express");

const { getProfile } = require("./controller");

const router = Router();

// function protect(req, res, next) {
//   userId = req.headers.authorization;
//   console.log("USER ID", userId);
//   //get the token from the client side (headers)
//   //jwt verify token and acces the id
//   //match with the database to find the unique userId
//   //req.user=user to send back to the front-end
//   next();
// }

router.get("/profile", getProfile);

module.exports = router;
