const express = require('express');
const { getAllCarsAsync, createNewCarAsync, deleteCarWithIdAsync } = require('../db/repositories/carsRepo');

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
// Register / create a new car for a host.  Returns newly created car object.
router.post('/', async (req, res) => {
  try {
    const { rows } = await createNewCarAsync(req.body);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log('Error saving new car to DB:', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    _ = await deleteCarWithIdAsync(req.params.id);
    return res.status(204).json();
  } catch (err) {
    console.log('Error deleting record from DB:', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});


module.exports = router;
