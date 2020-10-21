const Contact = require('../models/contact.model');
const Agent = require('../models/agent.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const matchAlgoritm = require('../utils/matchAlgoritm');

module.exports = {
  async signup(req, res) {
    const data = req.body;
    try {
      const { password } = data;
      const encryptedPasword = await bcrypt.hash(password, 8);
      const contact = await Contact.create({
        ...data,
        password: encryptedPasword,
      });

      const token = jwt.sign({ id: contact._id }, process.env.SECRET);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json(err);
    }
  },

  list(req, res) {
    Contact.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => res.status(400).json(error));
  },

  findById(req, res) {
    const { id } = req.params;

    Contact.findById(id)
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

    Contact.findByIdAndUpdate(
      userId,
      {
        lastLatitude: myLatitude,
        lastLongitude: myLongitude,
      },
      { new: true },
    )
      .then((contact) => {
        Agent.find().then((agents) => {
          const matches = matchAlgoritm(myPosition, agents, range);
          res.status(200).json({ matches: matches, user: contact });
        });
      })
      .catch((err) => res.status(400).json(err));
  },
};
