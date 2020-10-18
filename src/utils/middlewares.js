const jwt = require('jsonwebtoken');

module.exports = {
  auth(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw Error('Your seesion has expired!');
      }

      const [bearer, token] = authorization.split(' ');

      if (!token) {
        throw Error('Your seesion has expired!');
      }

      const { id } = jwt.verify(token, 'keyword');

      req.user = id;

      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};
