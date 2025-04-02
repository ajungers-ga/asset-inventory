// PURPOSE = checks whether a user is authenticated or logged in by: 
// looking for req.session.user
// If they are, it allows them to continue. If not, it redirects them to the login page
// this is how im protecting private routes like /portal, edit/delete pages, etc, 
// from being accessed by anyone not logged in with proper credentials

// BELOW = this middleware checks if a user is logged in before allowing access to a protected route
module.exports = (req, res, next) => { // request, response, next
    if (req.session && req.session.user) {
      next(); // user is logged in, continue to route
    } else {
      res.redirect('/auth/login'); // not logged in, send to login
    }
  };
  
  
  // ABOVE is how i export the middleware function so it can be plggged into my route....
  //... see BELOW comment and code from my SERVER.JS file below

  //// (10.B) BELOW = mount /portal routes for asset management; protect all with realAuth middleware
////// app.use('/portal', realAuth, assetRoutes); // Only accessible if realAuth passes