const db = require('../index');

exports.getOrdersForRenterWithIdAsync = id => {
  const queryText = `
    SELECT
      orders.id, orders.start_date, orders.end_date, orders.price,
      cars.image, make, model, cars.id as car_id, users.id as owners_id, users.name as owners_name,
      street_number, street, city, province, country, postal_code, email
    FROM orders
    JOIN availability ON availability_id = availability.id
    JOIN cars on car_id = cars.id
    JOIN users ON user_id = users.id
    JOIN locations ON cars.location_id = locations.id
    WHERE renter_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

exports.getOrdersForHostWithIdAsync = id => {
  const queryText = `
    SELECT orders.*, cars.id as car_id, cars.image as image, make, model, name, email, phone FROM orders
    JOIN users ON renter_id = users.id
    JOIN availability ON availability_id = availability.id
    JOIN locations ON location_id = locations.id
    JOIN cars ON car_id = cars.id
    WHERE cars.user_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

// Retrieves all orders for a specific car.
exports.getOrdersForCarWithIdAsync = id => {
  const queryText = `
    SELECT orders.id, orders.start_date, orders.end_date FROM orders
    JOIN availability ON availability_id = availability.id
    JOIN cars ON car_id = cars.id
    And cars.id = $1
    WHERE orders.end_date > CURRENT_DATE;
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
