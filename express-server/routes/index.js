const cars = require('./cars');
const users = require('./users');
const locations = require('./locations');
const availability = require('./availability');
const orders = require('./orders');

module.exports = app => {
  app.use('/api/cars', cars);
  app.use('/api/users', users);
  app.use('/api/locations', locations);
  app.use('/api/availability', availability);
  app.use('/api/orders', orders);
};
