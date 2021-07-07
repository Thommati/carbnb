const db = require('../index');

exports.getFavouritesForUserIdAsync = id => {
  const queryText = `
    SELECT * from favourites
    WHERE user_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};
