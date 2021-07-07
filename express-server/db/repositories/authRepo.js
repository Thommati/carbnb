const db = require('../index');

exports.getUserByEmailAsync = email => {
  const queryText = `
    SELECT * FROM users
    WHERE email = $1;
  `;
  const queryParams = [email];
  return db.query(queryText, queryParams);
};
