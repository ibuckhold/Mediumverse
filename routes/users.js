const express = require('express');
const {User} = require("../db/models");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { csrfProtection, asyncHandler } = require('../utils');
const { loginUser, logoutUser } = require('../auth');

router.get("/login", csrfProtection, (req, res) => {
  // GET mediumverse.com/users/login
  res.render('user-login', {
    title: "Login",
    csrfToken: req.csrfToken()
  });
});

const loginValidators = [
  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for email"),
  check("password")
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for password")
];

router.post("/login", csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  let errors =[];
  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()){
    const user = await User.findOne({where: {email}});

    if(user !== null){
      const passwordMatches = await bcrypt.compare(password, user.hashedPassword.toString());

      if(passwordMatches){
        loginUser(req,res,user); // adds user to res.session.auth
        return res.redirect("/");
      }
    }

    errors.push("Login failed for the provided email address and password");
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('user-login', {
    title: "Login",
    email,
    errors,
    csrfToken: req.csrfToken()
  });

}));


router.get("/signup", (req, res) => {
  // GET mediumverse.com/users/signup

  // check for email length
});

module.exports = router;
