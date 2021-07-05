const db = require('./index');

// Get all cars / get all cars for province + city
// Param: filters = { province: string, city: string }
exports.getAllCarsAsync = (filters) => {
  let queryText = `
  SELECT cars.*, name, email, phone, city, province, country FROM cars
  JOIN users ON cars.user_id = users.id
  JOIN locations ON locations.user_id = users.id
  `;
  const queryParams = [];

  const { province, city } = filters;
  if (province && city) {
    queryText += `
      WHERE LOWER(locations.province) = LOWER($1) AND LOWER(locations.city) = LOWER($2)
    `;
    queryParams.push(province, city);
  }

  queryText += ';';

  return db.query(queryText, queryParams);
};

