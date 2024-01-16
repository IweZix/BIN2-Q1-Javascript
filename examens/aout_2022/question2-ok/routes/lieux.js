const express = require('express');

const router = express.Router();

const { registerPlace } = require('../models/lieux');

/* POST a place. */
router.post('/', (req, res) => {
  console.log('Router POST /lieux');
  const name = req?.body?.name;
  const description = req?.body?.description;

  if (!name || !description) {
    return res.status(400);
  }

  const place = registerPlace(name, description);

  if (!place) {
    return res.status(400);
  }

  return res.json(place);
});

module.exports = router;
