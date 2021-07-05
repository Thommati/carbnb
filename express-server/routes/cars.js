const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  let queryText = `
  SELECT cars.*, name, email, phone, city, province, country FROM cars
  JOIN users ON cars.user_id = users.id
  JOIN locations ON locations.user_id = users.id
  `;
  const queryParams = [];

  const { province, city } = req.query;
  if (province && city) {
    queryText += `
      WHERE LOWER(locations.province) = LOWER($1) AND LOWER(locations.city) = LOWER($2)
    `;
    queryParams.push(province, city);
  }

  queryText += ';';

  const { rows } = await db.query(queryText, queryParams);
  return res.json(rows);
});


module.exports = router;
