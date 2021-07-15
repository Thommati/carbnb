const db = require('../index');

exports.getFavouritesForUserIdAsync = id => {
  const queryText = `
    SELECT favourites.*, make, model, cars.image as image, city, province
    FROM favourites
    JOIN cars ON favourites.car_id = cars.id
    JOIN locations ON locations.id = cars.location_id
    WHERE favourites.user_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};

exports.createNewFavouriteAsync = (userId, carId) => {
  const queryText = `
    INSERT INTO favourites (user_id, car_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const queryParams = [userId, carId];
  return db.query(queryText, queryParams);
};

exports.deleteFavouriteAsync = (userId, carId) => {
  const queryText = `
    DELETE FROM favourites
    WHERE user_id = $1 AND car_id = $2;
  `;
  const queryParams = [userId, carId];
  return db.query(queryText, queryParams);
};
