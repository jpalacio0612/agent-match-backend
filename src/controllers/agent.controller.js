const Agent = require('../models/agent.model');
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
    const { myLatitude } = req.body;
    const { myLongitude } = req.body;

    Agent.findByIdAndUpdate(
      userId,
      {
        lastLatitude: myLatitude,
        lastLongitude: myLongitude,
      },
      { new: true },
    )
      .then((agent) => {
        console.log(agent);
        // Contacts.find().then((contacts) =>
        //   matchAlgoritm(agent, contacts, range),
        // );
      })
      .catch((err) => res.status(400).json(err));

    // traer posiciones de clientes
    // Algoritmo emparejador [posicion propia, Lista de posiciones, rango]
    // Devuelve un array con los nombres y coordenadas
    res.status(200).json({ message: 'welldone' });
  },
};
