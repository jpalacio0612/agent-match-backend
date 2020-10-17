const router = require('express').Router();
const agentController = require('../controllers/agent.controller');

router.route('/').get(agentController.list);
router.route('/').post(agentController.create);

module.exports = router;
