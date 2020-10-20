const Agent = require('../models/agent.model');
const Contact = require('../models/contact.model');
const matchAlgoritm = require('../utils/matchAlgoritm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async signup(req, res) {
    const data = req.body;
    try {
      const { password } = data;
      const encryptedPasword = await bcrypt.hash(password, 8);
      const agent = await Agent.create({ ...data, password: encryptedPasword });

      const token = jwt.sign({ id: agent._id }, 'keyword');
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json(err);
    }
  },

  list(req, res) {
    Agent.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => res.status(400).json(error));
  },

  findById(req, res) {
    const { id } = req.params;

    Agent.findById(id)
      .then((task) => res.status(200).json(task))
      .catch(() =>
        res.status(400).json({ message: `Could not find the agent` }),
      );
  },

  getMatch(req, res) {
    const { userId } = req.body;
    const { myLongitude } = req.body;
    const { myLatitude } = req.body;
    const { range } = req.body;
    const myPosition = [myLongitude, myLatitude];

    Agent.findByIdAndUpdate(
      userId,
      {
        lastLatitude: myLatitude,
        lastLongitude: myLongitude,
      },
      { new: true },
    )
      .then((agent) => {
        Contact.find().then((contacts) => {
          const matches = matchAlgoritm(myPosition, contacts, range);
          res.status(200).json({ matches: matches, agent: agent });
        });
      })
      .catch((err) => res.status(400).json(err));
  },
};
