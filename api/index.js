const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// CUSTOM MODULES
const RegisterAPI = require("./user/register");
const GitlabAPI = require("./user/gitlab");

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

router.get("/get-all-names", GitlabAPI);

module.exports = router;
