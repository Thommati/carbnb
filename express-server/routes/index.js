const cars = require('./cars');

module.exports = app => {
  app.use('/api/cars', cars);
};
