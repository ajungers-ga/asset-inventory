// this file defines my crud logic for interacting with the Asset model and linking it to ejs views

// BELOW = importing my Asset model so the controller can read assets in mongo
const Asset = require('../models/asset'); 

// BELOW = display all assets for the user, then it renders /views/portal/index.ejs
const portal = async (req, res) => { 
  try {
    const assets = await Asset.find({ userId: req.session.user._id });
    res.render('portal/index', { assets });
  } catch (err) {
    console.log(err);
    res.send('Error loading asset portal');
  }
};

// BELOW = creating a new asset in views/portal/new.ejs
const newAsset = (req, res) => {
  res.render('portal/new');
};

// BELOW = handle the form to create a new asset
const create = async (req, res) => {
  try {
    req.body.userId = req.session.user._id;

    // Convert 4-digit year input to full Date object
    if (req.body.manufacturedYear) {
      req.body.manufacturedDate = new Date(`${req.body.manufacturedYear}-07-01`);
    }

    await Asset.create(req.body);
    res.redirect('/portal');
  } catch (err) {
    console.log(err);
    res.send('Error creating asset');
  }
};

// BELOW = show one asset (details page) by loading it via req.params.id
const show = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    res.render('portal/show', { asset });
  } catch (err) {
    console.log(err);
    res.send('Error loading asset details');
  }
};

// BELOW = edit section, displaying a single asset by ID and showing edit form
const edit = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset.userId.toString() !== req.session.user._id) {
      return res.status(403).send('Not authorized');
    }
    res.render('portal/edit', { asset });
  } catch (err) {
    console.log(err);
    res.send('Error loading edit form');
  }
};

// BELOW = handling the form to update an asset
const update = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset.userId.toString() !== req.session.user._id) {
      return res.status(403).send('Not authorized');
    }

    // Convert year input to full Date object
    if (req.body.manufacturedYear) {
      req.body.manufacturedDate = new Date(`${req.body.manufacturedYear}-07-01`);
    }

    // Clean up req.body to only include fields the schema expects
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

// BELOW = delete a single asset if ownership is valid
const destroy = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset.userId.toString() !== req.session.user._id) {
      return res.status(403).send('Not authorized');
    }
    await Asset.findByIdAndDelete(req.params.id);
    res.redirect('/portal');
  } catch (err) {
    console.log(err);
    res.send('Error deleting asset');
  }
};

// BELOW = exporting all controller functions to be used in routes file
module.exports = {
  portal,
  new: newAsset,
  create,
  show,
  edit,
  update,
  destroy
};