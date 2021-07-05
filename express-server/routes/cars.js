const express = require('express');
const { getAllCarsAsync, createNewCarAsync } = require('../db/repositories/carsRepo');

const router = express.Router();

// GET /api/cars
// gets all cars in db, or gets all cars for a given province & city
// if either province or city are null then all cars in db will be returned.
router.get('/', async (req, res) => {
  const { province, city } = req.query;
  try {
    const { rows } = await getAllCarsAsync({province, city});
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving cars from DB:', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

// POST /api/cars
// Register / create a new car for a host
router.post('/', async (req, res) => {
  try {
    const response = await createNewCarAsync(req.body);
    return res.json(response);
  } catch (err) {
    console.log('Error saving new car to DB:', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});


module.exports = router;
