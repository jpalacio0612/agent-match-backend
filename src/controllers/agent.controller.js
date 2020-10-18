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

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Agent.findOne({ email });

      if (!user) {
        throw Error('User does not exist');
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw Error('User/Password invalid!');
      }

      const token = jwt.sign({ id: user._id }, 'keyword');

      res.status(200).json({ token: token, userId: user._id });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
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

  getMatch(req, res) {
    const data = req.body;
    console.log(data);
    // Almacenar esto como lastposition
    // traer posiciones de clientes
    // Algoritmo emparejador [posicion propia, Lista de posiciones, rango]
    // Devuelve un array con los nombres y coordenadas
    res.status(200).json({ message: 'welldone' });
  },
};
