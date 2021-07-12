const jwt = require('jsonwebtoken');

exports.generateJwtToken = (id, name, email, image, hosts) => {
  return jwt.sign({ sub: id, name, email, image, hosts }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};
