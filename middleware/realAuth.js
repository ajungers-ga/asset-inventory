// This middleware checks if a user is logged in before allowing access to a protected route

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
      next(); // user is logged in, continue to route
    } else {
      res.redirect('/auth/login'); // not logged in, send to login
    }
  };
  