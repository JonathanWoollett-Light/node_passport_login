module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/login");
  },
  forwardAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/user");
    }
    return next();
  }
};
