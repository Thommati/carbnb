const db = require('../index');

exports.createNewUserAsync = user => {
  const queryText = `
    INSERT INTO users (name, email, phone, password, image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const queryParams = [
    user.name,
    user.email,
    user.phone,
    user.password,
    user.image
  ];
  return db.query(queryText, queryParams);
};

exports.getUserByIdAsync = id => {
  queryText = `
    SELECT *
    FROM users
    WHERE id = $1;
  `;
  queryParams = [id];
  return db.query(queryText, queryParams);
};
