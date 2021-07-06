const db = require('../index');

exports.getAllAvailabilitiesAsync = () => {
  const queryText = `
    SELECT availability.*, name, email, phone, make, model
    FROM availability
    JOIN users ON owner_id = users.id
    JOIN cars ON car_id = cars.id;
  `;
  const queryParams = [];
  return db.query(queryText, queryParams);
};

exports.createAvailability = data => {
  const queryText =``;
  const queryParams = [];
  return db.query(queryText, queryParams);
};
