const express = require('express');
const { getReviewsAsync } = require('../db/repositories/reviewsRepo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await getReviewsAsync(req.query);
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving reviews', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
