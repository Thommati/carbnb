const express = require('express');
const {
  getAllAvailabilitiesAsync,
  createAvailabilityAsync,
  deleteAvailabilityAsync,
  updateAvailabilityWithIdAsync
} = require('../db/repositories/availabilityRepo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await getAllAvailabilitiesAsync();
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving availabilities', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { rows } = await createAvailabilityAsync(req.body);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log('Error creating new availability', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    _ = await deleteAvailabilityAsync(req.params.id);
    return res.status(204).json();
  } catch (error) {
    console.log(`Error deleting availability with id ${req.params.id}`, err);
    res.status(500).json({error: 'Internal server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    _ = await updateAvailabilityWithIdAsync(req.params.id, req.body);
    return res.status(204).json();
    return res.json({queryText});
  } catch (err) {
    console.log('Error updating availability', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
