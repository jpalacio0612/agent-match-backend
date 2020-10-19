const Contact = require('../models/contact.model');
const Agent = require('../models/agent.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async signin(req, res) {
    try {
      let user;
      let userType;
      const { email, password } = req.body;
      user = await Contact.findOne({ email });
      userType = 'contact';

      if (!user) {
        user = await Agent.findOne({ email });
        userType = 'agent';
        if (!user) {
          throw Error('User does not exist');
        }
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw Error('User/Password invalid!');
      }

      const token = jwt.sign({ id: user._id }, 'keyword');

      res
        .status(200)
        .json({ token: token, userId: user._id, userType: userType });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};
