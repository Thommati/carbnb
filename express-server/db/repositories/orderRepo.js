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

exports.deleteOrderWithIdAsync = id => {
  const queryText = 'DELETE FROM orders WHERE id = $1';
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

exports.createNewOrderAsync = order => {
  queryText = `
    INSERT INTO orders (availability_id, renter_id, start_date, end_date, price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  queryParams = [
    order.availabilityId,
    order.renterId,
    order.startDate,
    order.endDate,
    order.price
  ];
  return db.query(queryText, queryParams);
};

exports.UpdateOrderWithIdAsync = (id, order) => {
  queryText = `
    UPDATE orders SET (start_date, end_date) = ($1, $2)
    WHERE id = $3;
  `;
  queryParams = [order.startDate, order.endDate, id];
  return db.query(queryText, queryParams);
};
