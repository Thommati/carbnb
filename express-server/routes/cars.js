const express = require('express');
const { getAllCarsAsync } = require('../db/repo');

const router = express.Router();

// GET /api/cars
// gets all cars in db, or gets all cars for a given province & city
// if either province or city are null then all cars in db will be returned.
router.get('/', async (req, res) => {
  const { province, city } = req.query;
  const { rows } = await getAllCarsAsync({province, city});
  return res.json(rows);
});

// POST /api/cars
// Register / create a new car for a host
router.post('/', async (req, res) => {
  res.json({routeStatus: 'not implemented'});
});


module.exports = router;
