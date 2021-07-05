const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = `SELECT * FROM cars;`;
  const { rows } = await db.query(query, []);
  return res.json(rows);
});


module.exports = router;
