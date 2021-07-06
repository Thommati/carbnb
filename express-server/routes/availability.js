const express = require('express');
const { getAllAvailabilitiesAsync, createAvailabilityAsync } =  require('../db/repositories/availabilityRepo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await getAllAvailabilitiesAsync();
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving availabilities', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { rows } = await createAvailabilityAsync(req.body);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log('Error creating new availability', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
