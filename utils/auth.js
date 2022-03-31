const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login-page");
  } else {
    next();
  }
};

module.exports = withAuth;
