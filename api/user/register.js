const Author = require("../../models/authorModel");

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// REGISTER API CALL
const registerApiCall = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({
      success: false,
      message: errors.array(),
    });
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      } else {
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
        };
        const saveUser = new Author(userData);
        saveUser.save((err, data) => {
          if (err) {
            console.log(err.message);
            res.status(400).json({
              success: false,
              message: "Could not save user",
            });
          } else {
            res.status(201).json({
              success: true,
              message: "User saved Successfully",
            });
          }
        });
      }
    });
  }
};

module.exports = registerApiCall;
