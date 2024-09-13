const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const authController = require("../controllers/authController");
const { rateLimiter } = require("../controllers/rateLimiter");

router
  .route("/login")
  .get(authController.handleLogin)
  .post(validateForm, rateLimiter(60, 10), authController.initialLogin);

router.post(
  "/register",
  validateForm,
  rateLimiter(30, 5),
  authController.handleSignup
);

module.exports = router;
