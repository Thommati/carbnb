const db = require("../index");

// Get all cars / get all cars for province + city
// Param: filters = { province: string, city: string }
// exports.getAllCarsAsync = (filters) => {
//   let queryText = `
//   SELECT cars.*, name, email, phone, city, province, country FROM cars
//   JOIN users ON cars.user_id = users.id
//   JOIN locations ON cars.location_id = locations.id
//   `;
//   const queryParams = [];

//   const { city } = filters;
//   if (city) {
//     queryText += `
//       WHERE LOWER(locations.city) = LOWER($1)
//     `;
//     queryParams.push(city);
//   }

//   queryText += ";";

//   return db.query(queryText, queryParams);
// };

exports.getAllCarsAsync1 = (filters) => {
  let queryText = `
  SELECT cars.id, cars.user_id, cars.location_id, cars.make, cars.model, cars.doors, cars.colour, cars.transmission, cars.description, cars.pet_friendly, cars.fuel, cars.seats, cars.image, cars.sport, cars.truck, cars.van, cars.mini_van, cars.luxury, cars.rv, cars.suv, cars.convertible, cars.economy, cars.model_year, name, email, phone, city, province, country, availability.price FROM cars
INNER JOIN users ON cars.user_id = users.id
INNER JOIN locations ON cars.location_id = locations.id
INNER JOIN availability ON availability.car_id = cars.id
WHERE
  availability.start_date < $2
  AND
  availability.end_date > $3
  AND
  locations.city = $1
  AND
  NOT EXISTS(
    SELECT orders.id
    FROM orders
    WHERE
      orders.availability_id = availability.id
      AND (
        (orders.start_date > $2
        AND
        orders.start_date < $3)
        OR
        (orders.end_date > $2
        AND
        orders.end_date < $3)
      )
  );`;

  const queryParams = [];

  const { city, fromDate, toDate } = filters;

  queryParams.push(city);
  queryParams.push(fromDate);
  queryParams.push(toDate);

  return db.query(queryText, queryParams);
};

// Get all cars for a user by user's id
exports.getCarsByUserId = id => {
  const queryText = `
    SELECT cars.* from cars
    JOIN users ON user_id = users.id
    WHERE user_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

// Add a new car to the database
exports.createNewCarAsync = (data) => {
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
      economy,
      model_year
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
    RETURNING *;
  `;

  const queryParams = [
    data.userId,
    data.locationId,
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
    data.economy,
    data.modelYear,
  ];

  return db.query(queryText, queryParams);
};

// Return a car and some user / location info by car id
exports.getCarByIdAsync = (id) => {
  console.log('id passed into query is:', id);
  const queryText = `
    SELECT cars.*, name, email, phone, city, province, country
    FROM cars
    JOIN users ON cars.user_id = users.id
    JOIN locations on cars.location_id = locations.id
    WHERE cars.id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

// Delete car with the givin id
exports.deleteCarWithIdAsync = (id) => {
  const queryText = "DELETE FROM cars WHERE id = $1";
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

exports.updateCarAsync = (id, data) => {
  const queryParams = [];

  let setItems = "";
  let values = "";
  for (const key of Object.keys(data)) {
    if (key === "id") {
      continue;
    }

    // Account for camelCase input and snake_case db columns
    switch (key) {
      case "userId":
        setItems += "user_id, ";
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      case "locationId":
        setItems += "location_id, ";
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      case "petFriendly":
        setItems += "pet_friendly, ";
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      case "miniVan":
        setItems += "mini_van, ";
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      default:
        setItems += `${key}, `;
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
    }
  }

  setItems = setItems.slice(0, -2);
  values = values.slice(0, -2);

  queryParams.push(id);

  queryText = `
    UPDATE cars SET (${setItems}) = (${values}) WHERE id = $${queryParams.length};
  `;

  return db.query(queryText, queryParams);
};
