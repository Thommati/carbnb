const db = require('../index');

exports.getOrdersForRenterWithIdAsync = id => {
  const queryText = `
    SELECT * FROM orders
    WHERE renter_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

exports.getOrdersForHostWithIdAsync = id => {
  const queryText = `
    SELECT orders.*, cars.id as car_id, make, model, name, email, phone FROM orders
    JOIN users ON renter_id = users.id
    JOIN availability ON availability_id = availability.id
    JOIN cars ON car_id = cars.id
    WHERE owner_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};
