const express = require('express');

const router = express.Router();

const { register, registerFavorite } = require('../models/users');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

/* POST user. */
router.post('/', (req, res) => {
  const name = req?.body?.name;
  const password = req?.body?.password;

  if (!name || !password) {
    return res.status(400);
  }

  const user = register(name, password);

  if (!user) {
    return res.status(400);
  }

  return res.json(user);
});

/* POST a place into favorite's user place */
router.post('/favorite', (req, res) => {
  console.log('Router POST /favorites');

  const userId = parseInt(req?.body?.userId, 10);
  const placeId = parseInt(req?.body?.placeId, 10);

  if (!userId || !placeId) {
    return res.status(400);
  }

  const user = registerFavorite(userId, placeId);

  if (!user) {
    console.log('User not found');
    return res.status(400);
  }

  return res.json(user);
});

module.exports = router;
