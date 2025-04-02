// PURPOSE = server.js is the MAIN ENTRY POINT for my app/project. It handles:
//  (1) loading environment variables
//  (2) importing core packages
//  (3) creation of an instance
//  (4) importing routes and middleware
//    project wide setup like: (5)mongoDB connection, (6)middleware, and (8)view engine
//  (7) Set up session middleware
//  (9) homepage route
//  (10) mounting of /auth routes
//  (11) server start & my local listening port of 3008



// (1) BELOW = load variables from my .env file (mongodb_uri) into process.env
require('dotenv').config();

// (2) BELOW = importing all required packages; These packages (2.A through 2.E) are essential tools that make my app run
const express = require('express'); // 2.A - build the server, define the ROUTES
const mongoose = require('mongoose'); // 2.B - talk to mongoDB, define the MODELS
const session = require('express-session'); // 2.C - enable login sessions
const methodOverride = require('method-override'); // 2.D - use PUT/DELETE in forms
const path = require('path'); // 2.E - safely work with file paths

// (3) BELOW = creating an instace of the express app
const app = express();

// (4) BELOW = importing asset and auth routes. plus, additional middleware
const assetRoutes = require('./routes/assetRoutes'); // import all route files which contains routes related to the asset inventory in /portal, /portal/new etc
const authRoutes = require('./routes/authRoutes');   // import all routes related to user login/signup/logout in /auth/signup, /auth/login etc 
const realAuth = require('./middleware/realAuth');   // importing a CUSTOM middleware function to protect private routes in the app 

// (5) BELOW = connecting to mongoDB using a connection string from my .env file and logging the connection status
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB error:', err);
});

// (6) BELOW = the app-level Middleware: 6.A: enables form data parsing, 6.B: servicing static assets like my css, 
// and 6.C: allow PUT/DELETE methods via query params 
app.use(express.urlencoded({ extended: true })); // 6.A - parse form data from POST requests and attach it to req.body
app.use(express.static('public')); // 6.B - tells express to serve static files like my public/style.css from the public directory
app.use(methodOverride('_method')); // 6.C - enabling support for http verbs like PUT and DELETE in html forms, which nnoormally only support GET and POST


// (7) BELOW = congfiguring session settings to track logged in users
// this keeps track of each user's session - so once they're logged in, the server can remember who they are BETWEEN requests
app.use(
  session({
    secret: 'supersecret', // a string used to sign the session ID cookie, this keeps it secure
    resave: false, // prevents the sesion from being saved back to the store if nothing changed
    saveUninitialized: false, // dont save new sessions unlesss somehting is stored in them (like req.session.user)
  })
);

// (8) BELOW = 8.A: set the view engine & 8.B: view path: use ejs as the templating engine and set the views directory
app.set('view engine', 'ejs'); // 8.A
app.set('views', path.join(__dirname, 'views')); // 8.B

// (9) BELOW = the homepage route - render the homepage view when someone visits the root URL
app.get('/', (req, res) => {
  res.render('home');
});

// (10.A) BELOW = mount /auth routes for signup, login & logout
app.use('/auth', authRoutes);

// (10.B) BELOW = mount /portal routes for asset management; protect all with realAuth middleware
app.use('/portal', realAuth, assetRoutes); // Only accessible if realAuth passes

// (11) BELOW = start the server on port 3008 and log that its running
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
