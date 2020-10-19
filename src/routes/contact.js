const router = require('express').Router();
const contactController = require('../controllers/contact.controller');
const { auth } = require('../utils/middlewares');

router.route('/').get(contactController.list);
router.route('/').post(contactController.signup);
router.route('/:id').get(contactController.findById);
router.route('/getmatch').post(auth, contactController.getMatch);

module.exports = router;
