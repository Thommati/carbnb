const express = require('express');
const { getLocationsForUser } = require('../db/repositories/locationsRepo');

const router = express.Router();

// GET /api/locations/user/:id
// Retrieves all locations saved by a user with id
router.get('/user/:id', async (req, res) => {
  try {
    const { rows } = await getLocationsForUser(req.params.id);
    return res.json(rows);
  } catch (err) {
    console.log(`Error retrieving locations for user with id ${req.params.id}`, err);
    return res.status(500).json({error: 'Internal server error'});
  }
});


module.exports = router;
