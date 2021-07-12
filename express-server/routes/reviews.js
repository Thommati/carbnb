const express = require('express');
const {
  getReviewsAsync,
  createNewReviewAsync,
} = require('../db/repositories/reviewsRepo');

const router = express.Router();

// GET /api/reviews?[[hostId={id}], [renterId={id}], [carId={id}]]
router.get('/', async (req, res) => {
  try {
    const { rows } = await getReviewsAsync(req.query);
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving reviews', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { rows } = await createNewReviewAsync(req.body);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.log('Error creating review', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
