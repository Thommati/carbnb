const db = require('../index');

exports.getReviewsAsync = filters => {
  let queryText = `
    SELECT reviews.*, reviewer.name as reviewer_name, reviewer.image as reviewer_image, reviewed.name as reviewed_name
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

exports.createNewReviewAsync = review => {
  // Set date reviewed to current date
  review.dateReviewed = new Date();

  // Make sure rating is an integer betweetn 0 and 5 inclusive
  if (review.rating > 5) {
    review.rating = 5;
  } else if (review.rating < 0) {
    review.rating = 0;
  } else {
    review.rating = Math.floor(review.rating);
  }
  console.log('review object', review);
  const queryText = `
    INSERT INTO reviews (
      reviewer_id,
      reviewed_user_id,
      car_id,
      date_reviewed,
      rating,
      comments
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const queryParams = [
    review.reviewerId,
    review.reviewedId,
    review.carId,
    review.dateReviewed,
    review.rating,
    review.comments
  ];

  return db.query(queryText, queryParams);
};
