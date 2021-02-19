const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// CUSTOM MODULES
const RegisterAPI = require("./user/register");

// MIDDLEWARE MODULE
// const middleware = require('../middleware/verifyToken');

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
// router.post('/login', [check('email').notEmpty(), check('email').isEmail(), check('password').notEmpty()], LoginAPI);
// router.get('/get-all-resorts', ResortsAPI.getAllResorts);
// router.get('/resort/:resortId', ResortsAPI.getOneResort);
// router.post('/review', [middleware.VerifyToken], ReviewsAPI.createReview);
// router.get('/reviews', ReviewsAPI.getAllReviews);
// router.get('/user-details', [middleware.VerifyToken], getOneUser);
// router.patch('/update-profile', [middleware.VerifyToken], UpdateProfile);

module.exports = router;
