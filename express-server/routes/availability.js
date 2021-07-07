const express = require('express');
const {
  getAllAvailabilitiesAsync,
  createAvailabilityAsync,
  deleteAvailabilityAsync,
  updateAvailabilityWithIdAsync
} = require('../db/repositories/availabilityRepo');

const router = express.Router();

// GET /api/availability
// GET /api/availability?ownerId={id}
// Retrieves all availabilities, and optionally filters by owner id
router.get('/', async (req, res) => {
  try {
    const { rows } = await getAllAvailabilitiesAsync(req.query.ownerId);
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving availabilities', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/availability
// Creates a new availability
router.post('/', async (req, res) => {
  try {
    const { rows } = await createAvailabilityAsync(req.body);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log('Error creating new availability', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/availability/:id
// Deletes the availability with the given id
router.delete('/:id', async (req, res) => {
  try {
    _ = await deleteAvailabilityAsync(req.params.id);
    return res.status(204).json();
  } catch (error) {
    console.log(`Error deleting availability with id ${req.params.id}`, err);
    res.status(500).json({error: 'Internal server error'});
  }
});

// PUT /api/availability/:id
// Updates the givan availability.  Requires at least two fields set on the body
// to work.  Best to pass in the entire availability object.  Will not allow id
// or owner_id to be changed.
router.put('/:id', async (req, res) => {
  try {
    _ = await updateAvailabilityWithIdAsync(req.params.id, req.body);
    return res.status(204).json();
  } catch (err) {
    console.log('Error updating availability', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
