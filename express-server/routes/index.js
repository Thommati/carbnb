const cars = require('./cars');
const users = require('./users');

module.exports = app => {
  app.use('/api/cars', cars);
  app.use('/api/users', users);
};
