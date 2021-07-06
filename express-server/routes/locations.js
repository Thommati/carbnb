const express = require('express');
const { getLocationsForUserAsync, createNewLocationAsync } = require('../db/repositories/locationsRepo');

const router = express.Router();

// GET /api/locations/user/:id
// Retrieves all locations saved by a user with id
router.get('/user/:id', async (req, res) => {
  try {
    const { rows } = await getLocationsForUserAsync(req.params.id);
    return res.json(rows);
  } catch (err) {
    console.log(`Error retrieving locations for user with id ${req.params.id}`, err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { rows } = await createNewLocationAsync(req.body);
    return res.json(rows[0]);
  } catch (err) {
    console.log('Error creating new location', err);
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
