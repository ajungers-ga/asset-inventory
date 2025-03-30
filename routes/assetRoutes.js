const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

function realAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', assetController.portal);
router.get('/new', assetController.new);
router.post('/', assetController.create);
router.get('/:id', assetController.show);
router.get('/:id/edit', assetController.edit);
router.put('/:id', assetController.update);
router.delete('/:id', assetController.destroy);

module.exports = router;