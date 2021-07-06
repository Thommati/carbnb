const db = require('../index');

exports.getOrdersForRenterWithIdAsync = id => {
  const queryText = `
    SELECT * FROM orders
    WHERE renter_id = $1;
  `;
  const queryParams = [id];
  return db.query(queryText, queryParams);
};
