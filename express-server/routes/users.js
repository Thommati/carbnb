const express = require('express');
const bcrypt = require('bcrypt');

const { generateJwtToken } = require('../helpers/auth-helpers');
const { createNewUserAsync, getUserByIdAsync } = require('../db/repositories/usersRepo');

const router = express.Router();

// POST /api/users/
// Creates a new user in DB and returns a JWT
router.post('/', async (req, res) => {
  try {
    const user = {...req.body};

    // Hash password using bcrypt
    user.password = await bcrypt.hash(req.body.password, 12);

    const { rows } = await createNewUserAsync(user);
    const { id, name, email, image } = rows[0];

    // Create JWT token
    const token = generateJwtToken(id, name, email, image);

    return res.status(201).json(token);
  } catch (err) {
    console.log('Error creating new user', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await getUserByIdAsync(req.params.id);
    const { id, name, email, image } = rows[0];
    return res.json({ id, name, email, image });
  } catch (err) {
    console.log(`Error retrieving user with id ${req.params.id}`);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
