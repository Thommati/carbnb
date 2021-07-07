const db = require('../index');

exports.getFavouritesForUserIdAsync = id => {
  const queryText = `
    SELECT * from favourites
    WHERE user_id = $1;
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
