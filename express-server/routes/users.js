const express = require('express');
const bcrypt = require('bcrypt');

const { createNewUserAsync } = require('../db/repositories/usersRepo');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = {...req.body};

    // Hash password using bcrypt
    user.password = await bcrypt.hash(req.body.password, 12);

    const { rows } = await createNewUserAsync(user);
    const returnedUser = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      image: rows[0].image
    };

    return res.status(201).json(returnedUser);
  } catch (err) {
    console.log('Error creating new user', err);
    return res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
