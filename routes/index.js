const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.sendStatus(200));

// Dashboard
router.get("/user", ensureAuthenticated, (req, res) =>
  res.render("user", {
    user: req.user
  })
);

module.exports = router;
