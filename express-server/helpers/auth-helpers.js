const jwt = require('jsonwebtoken');

exports.generateJwtToken = (id, name, email, image) => {
  return jwt.sign({ sub: id, name, email, image }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};
