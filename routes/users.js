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

router.post("/login", csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  let errors =[];
  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()){
    const user = await User.findOne({where: {email}});

    if(user !== null){
      const passwordMatches = await bcrypt.compare(password, user.hashedPassword.toString());

      if(passwordMatches){
        loginUser(req,res,user); // adds user to res.session.auth
        return req.session.save(e => {
          if(e){
            next(e);
          }
          return res.redirect("/");
        });
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


router.get("/signup", csrfProtection, (req, res) => {
  const user = User.build();
  res.render("user-signup", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken()
  });
  // check for email length
});

const signUpValidator = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long')
    // .isUnique()  is this functionable
    // .withMessage('That username is already in use.'),
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Username is already in use by another account');
          }
        });
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 50 })
    .withMessage('Email Address must not be more than 50 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
]

router.post('/signup', csrfProtection, signUpValidator, asyncHandler(async(req, res) => {
  const {
    email,
    username,
    password
  } = req.body;

  const user = User.build({
    email,
    username
  });

  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-signup', {
      title: "Sign Up",
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  }
}));


router.post("/logout", asyncHandler(async (req,res) => {
  logoutUser(req,res);
  res.redirect("/");
}));

module.exports = router;
