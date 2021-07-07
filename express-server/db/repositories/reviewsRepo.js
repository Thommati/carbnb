const db = require('../index');

exports.getReviewsAsync = filters => {
  let queryText = `
    SELECT reviews.*, reviewer.name as reviewer_name, reviewed.name as reviewed_name
    FROM reviews
    JOIN users reviewer ON reviewer_id = reviewer.id
    JOIN users reviewed ON reviewed_user_id = reviewed.id
  `;
  const queryParams = [];

  if (filters.carId) {
    // gets all reviews for a car
    queryText += 'WHERE car_id = $1;';
    queryParams.push(filters.carId);
  } else if (filters.hostId) {
    // gets all reviews for a host
    queryText += 'WHERE reviewed_user_id = $1';
    queryParams.push(filters.hostId);
  } else if (filters.renterId) {
    // gets all reviews for a renter
    queryText += 'WHERE reviewed_user_id = $1';
    queryParams.push(filters.renterId);
  } else {
    // get all reviews
    queryText += ';';
  }

  return db.query(queryText, queryParams);
};
