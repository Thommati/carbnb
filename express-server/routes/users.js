const express = require('express');
const bcrypt = require('bcrypt');

const { generateJwtToken } = require('../helpers/auth-helpers');
const { createNewUserAsync } = require('../db/repositories/usersRepo');

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

    // const returnedUser = {
    //   id: rows[0].id,
    //   name: rows[0].name,
    //   email: rows[0].email,
    //   image: rows[0].image
    // };

    return res.status(201).json(token);
  } catch (err) {
    console.log('Error creating new user', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
