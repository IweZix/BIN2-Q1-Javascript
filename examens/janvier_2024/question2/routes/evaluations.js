/* eslint-disable indent */
const express = require('express');
const { authorize } = require('../utils/auths');
const { ajouterEvaluation } = require('../models/evaluation');

const router = express.Router();

router.post('/', authorize, (req, res) => {
    const id = req?.body?.id?.length !== 0 ? req.body.id : undefined;
    const score = req?.body?.score?.length !== 0 ? req.body.score : undefined;
    const user = req.user.username;

    if (!id || !score || score < 0 || score > 10 || !user) {
      return res.sendStatus(400);
    }

    const newEvaluation = ajouterEvaluation(id, score, user);
    if (!newEvaluation) {
      return res.sendStatus(404);
    }

    return res.json(newEvaluation);
});

module.exports = router;
