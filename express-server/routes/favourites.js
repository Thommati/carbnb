const express = require('express');
const {
  getFavouritesForUserIdAsync
} = require ('../db/repositories/favouritesRepo');

const router = express.Router();

router.get('/:id', async (req,res) => {
  try {
    const { rows } = await getFavouritesForUserIdAsync(req.params.id);
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving favourites', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
