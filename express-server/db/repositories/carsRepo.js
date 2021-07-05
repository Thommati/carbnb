const db = require('../index');

// Get all cars / get all cars for province + city
// Param: filters = { province: string, city: string }
exports.getAllCarsAsync = (filters) => {
  let queryText = `
  SELECT cars.*, name, email, phone, city, province, country FROM cars
  JOIN users ON cars.user_id = users.id
  JOIN locations ON cars.location_id = locations.id
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

// Add a new car to the database
exports.createNewCarAsync = data => {
  const queryText = `
    INSERT INTO cars (
      user_id,
      location_id,
      make,
      model,
      doors,
      colour,
      transmission,
      description,
      pet_friendly,
      fuel,
      seats,
      image,
      sport,
      truck,
      van,
      mini_van,
      luxury,
      rv,
      suv,
      convertible,
      economy
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);
  `;

  const queryParams = [
    data.userId,
    data.locationid,
    data.make,
    data.model,
    data.doors,
    data.colour,
    data.transmission,
    data.description,
    data.petFriendly,
    data.fuel,
    data.seats,
    data.image,
    data.sport,
    data.truck,
    data.van,
    data.miniVan,
    data.luxury,
    data.rv,
    data.suv,
    data.convertible,
    data.economy
  ]

  return db.query(queryText, queryParams);
};
