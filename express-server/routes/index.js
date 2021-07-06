const cars = require('./cars');
const users = require('./users');
const locations = require('./locations');

module.exports = app => {
  app.use('/api/cars', cars);
  app.use('/api/users', users);
  app.use('/api/locations', locations);
};
