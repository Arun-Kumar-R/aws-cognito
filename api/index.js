const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// CUSTOM MODULES
const RegisterAPI = require("./user/register");

// HOME ROUTE
router.get("/", (req, res) => {
  res.send("Welcome to User Api");
});

// USER ROUTES
router.post(
  "/create-user",
  [
    check("email").notEmpty(),
    check("password").notEmpty(),
    check("email").isEmail(),
  ],
  RegisterAPI
);

module.exports = router;
