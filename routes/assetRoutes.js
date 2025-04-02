// PURPOSE = this file defines all the routes related to the ASSET MODEL - 
// like viewing the asset portal, creating a new asset, editing, deleting, etc.
// Each route connects to the proper CONTROLLER function in assetController.js
// this file is ONLY ACCESSIBLE to logged in users, 
// thanks to realAuth being applied at server level (app.use'/portal', realAuth, assetRoutes in SERVER.JS)


// BELOW = importing express router and all CONTROLLER functions for asset logic
const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// BELOW = im defining 7 RESTful routes tied to ASSET ACTIONS.
router.get('/', assetController.portal); // GET /portal - show all assets for the logged in user
router.get('/new', assetController.new); // GET / portal/new - show form to create a new asset
router.post('/', assetController.create); // POST /portal - handle the form submission to create asset
router.get('/:id', assetController.show); // GET /portal/:id - show details of a specific asset
router.get('/:id/edit', assetController.edit); // GET /portal/:id/edit - show form to edit a specific asset
router.put('/:id', assetController.update); // PUT /portal/:id - handle update of asset data
router.delete('/:id', assetController.destroy); // DELETE /portal/:id - remove asset from the database


// BELOW = export all asset routes so they can be used in SERVER.JS 
module.exports = router;