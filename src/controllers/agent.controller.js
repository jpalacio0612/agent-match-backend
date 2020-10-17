const Agent = require('../models/agent.model');

module.exports = {
  create(req, res) {
    const data = req.body;

    Agent.create(data)
      .then((agent) => res.status(201).json(agent))
      .catch((error) => res.status(400).json(error));
  },

  list(req, res) {
    Agent.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => res.status(400).json(error));
  },

  show(req, res) {
    const { id } = req.params;

    Agent.findById(id)
      .then((task) => res.status(200).json(task))
      .catch(() =>
        res.status(400).json({ message: `Could not find the agent` }),
      );
  },
};
