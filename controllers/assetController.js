// this file defines my crud logic for interacting with the Asset model and linking it to ejs views

// BELOW = importing my asset model so this controller can access and manipulate data in mongoDB
const Asset = require('../models/asset'); 

// BELOW = display all assets that belong to the signed in user, then renders /portal page with those assets
const portal = async (req, res) => { 
  try {
    const assets = await Asset.find({ userId: req.session.user._id }); // _id = underscore before ID is the MONGODB default ducoment ID
    res.render('portal/index', { assets });
  } catch (err) {
    console.log(err);
    res.send('Error loading asset portal');
  }
};

// BELOW = render the new asset so the user can fill in the fields for the details of the newly created/redered asset
const newAsset = (req, res) => {
  res.render('portal/new');
};

// BELOW = handle the form to create a new asset. attach the userId, and covert year input to full date
const create = async (req, res) => {
  try {
    req.body.userId = req.session.user._id;

    // Convert 4-digit year input to full Date object
    if (req.body.manufacturedYear) {
      req.body.manufacturedDate = new Date(`${req.body.manufacturedYear}-07-01`); // backticks (`) in js, define a template literal. This allows me to embed variables into ${}
    }   
    // ABOVE = Why 07-01? 07 represents July:
    // when originally set to 01-01: because of timezone change,
    // the year selected by user would reflect 1 year prior to the sumbitted year.
    // example: the user selects the year 2017. when viewing the asset after creation, 
    // the asset would have a manufactured year of 2016


    await Asset.create(req.body);
    res.redirect('/portal');
  } catch (err) {
    console.log(err);
    res.send('Error creating asset'); // if new asset is not created properly, display this error message
  }
};

// BELOW = find a unique asset by ID and display its details on the show page
const show = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    res.render('portal/show', { asset });
  } catch (err) {
    console.log(err);
    res.send('Error loading asset details'); // if unique asset is not found, display this error message
  }
};

// BELOW = find the unique asset by ID, confirm ownership, and show it in the edit form page
const edit = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset.userId.toString() !== req.session.user._id) {
      return res.status(403).send('Not authorized'); // if user is not authorized to view a sensitive page, display this message
    }
    res.render('portal/edit', { asset });
  } catch (err) {
    console.log(err);
    res.send('Error loading edit form');  // if unique asset ID can not be found or edited properly, display this message
  } // maybe add to message - 'refresh the previous page and try again. Make sure to enter the exact asset ID of an exisiting asset and submit again.'
};

// BELOW = validate ownership, convert year input, build update object, update the asset in mongoDB
const update = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset.userId.toString() !== req.session.user._id) { // if user does not match the req session user id
      return res.status(403).send('Not authorized');        // display this message
    }

    // Convert year input to full Date object
    if (req.body.manufacturedYear) {
      req.body.manufacturedDate = new Date(`${req.body.manufacturedYear}-07-01`); 
    } 
    // ABOVE = Why 07-01? 07 represents July:
    // when originally set to 01-01: because of timezone change,
    // the year selected by user would reflect 1 year prior to the sumbitted year.
    // example: the user selects the year 2017. when viewing the asset after creation, 
    // the asset would have a manufactured year of 2016



    // clean up the req.body to only include fields the schema expects
    const updatedData = {
      name: req.body.name,
      category: req.body.category,
      make: req.body.make,
      condition: req.body.condition,
      assetTag: req.body.assetTag,
      manufacturedDate: req.body.manufacturedDate,
    };

    await Asset.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/portal');
  } catch (err) {
    console.log(err);
    res.send('Error updating asset');
  }
};

// BELOW = Conform asset ownership by signed in user, then delete it from the database
const destroy = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset.userId.toString() !== req.session.user._id) { // if the signed in user does not own the asset,
      return res.status(403).send('Not authorized');        // return this 'not authorized' error message
    }
    await Asset.findByIdAndDelete(req.params.id); // once id is confirmed, by the asset by unique ID and Delete
    res.redirect('/portal');
  } catch (err) {
    console.log(err);
    res.send('Error deleting asset'); // if the deletion is not successful, display this error message
  }
};

// BELOW = exporting all controller functions to be used in routes/assetRoutes.js file
module.exports = {
  portal,
  new: newAsset,
  create,
  show,
  edit,
  update,
  destroy
};