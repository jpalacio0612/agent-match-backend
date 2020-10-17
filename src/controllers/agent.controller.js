const Agent = require('../models/agent.model');

module.exports = {
  list(req, res) {
    Agent.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => res.status(400).json(error));
  },

  create(req, res) {
    const data = req.body;

    Agent.create(data)
      .then((agent) => res.status(201).json(agent))
      .catch((error) => res.status(400).json(error));
  },
};
