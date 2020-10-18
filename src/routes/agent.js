const router = require('express').Router();
const agentController = require('../controllers/agent.controller');
const { auth } = require('../utils/middlewares');

router.route('/').get(agentController.list);
router.route('/').post(agentController.signup);
router.route('/signin').post(agentController.signin);
router.route('/:id').get(agentController.show);
router.route('/getmatch').post(auth, agentController.getMatch);

module.exports = router;
