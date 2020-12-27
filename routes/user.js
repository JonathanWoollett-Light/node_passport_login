const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
  console.log("got here");
  res.render("login");
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: "/user",
    failureRedirect: "/user/login"
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/user/login");
});

module.exports = router;