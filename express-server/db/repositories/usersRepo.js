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
