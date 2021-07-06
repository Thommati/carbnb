const express = require('express');
const {
  getOrdersForRenterWithIdAsync,
  getOrdersForHostWithIdAsync
} = require('../db/repositories/orderRepo');

const router = express.Router();

// GET /api/orders/usesr/:id
// Retrieves all orders placed by the user with id
router.get('/user/:id', async (req, res) => {
  try {
    const { rows } = await getOrdersForRenterWithIdAsync(req.params.id);
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving orders for user', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

// GET /api/orders/host/:id
// Retrieves all orders for a hosts vehicles
router.get('/host/:id', async (req, res) => {
  try {
    const { rows } = await getOrdersForHostWithIdAsync(req.params.id);
    return res.json(rows);
  } catch (err) {
    console.log('Error retrieving orders for host', err);
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
