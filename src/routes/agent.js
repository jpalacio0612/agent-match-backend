const router = require('express').Router();
const agentController = require('../controllers/agent.controller');

router.route('/').get(agentController.list);
router.route('/').post(agentController.create);
router.route('/:id').get(agentController.show);

module.exports = router;
