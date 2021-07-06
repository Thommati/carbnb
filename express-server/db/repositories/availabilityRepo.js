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

exports.createAvailabilityAsync = data => {
  const queryText = `
    INSERT INTO availability (
      location_id,
      owner_id,
      start_date,
      end_date,
      delivery,
      car_id,
      price
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const queryParams = [
    data.locationId,
    data.ownerId,
    data.startDate,
    data.endDate,
    data.delivery,
    data.carId,
    data.price
  ];
  return db.query(queryText, queryParams);
};

exports.deleteAvailabilityAsync = id => {
  const queryText = 'DELETE FROM availability WHERE id = $1';
  const queryParams = [id];
  return db.query(queryText, queryParams);
}
