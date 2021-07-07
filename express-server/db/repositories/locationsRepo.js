const db = require('../index');

exports.getLocationsForUserAsync = userId => {
  const queryText = 'SELECT * FROM locations WHERE user_id = $1;';
  const queryParams = [userId];
  return db.query(queryText, queryParams);
};

exports.createNewLocationAsync = location => {
  const queryText = `
    INSERT INTO locations (
      user_id,
      street_number,
      apartment_number,
      street,
      city,
      province,
      country,
      postal_code,
      billing
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const queryParams = [
    location.userId,
    location.streetNumber,
    location.apartmentNumber,
    location.street,
    location.city,
    location.province,
    location.country,
    location.postalCode,
    location.billing
  ];
  return db.query(queryText, queryParams);
};
