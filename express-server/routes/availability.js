const express = require('express');
const { getAllAvailabilitiesAsync } =  require('../db/repositories/availabilityRepo');

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

module.exports = router;
