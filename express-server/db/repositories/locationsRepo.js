const db = require('../index');

exports.getLocationsForUser = userId => {
  const queryText = 'SELECT * FROM locations WHERE user_id = $1;';
  const queryParams = [userId];
  return db.query(queryText, queryParams);
};
