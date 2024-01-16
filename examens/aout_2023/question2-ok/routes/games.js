/* eslint-disable no-console */
const express = require('express');
const {
  readThreeQuestions, readThreeQuestionsByDifficulty, saveGame,
} = require('../models/games');

const router = express.Router();

/* POST save game. */
router.post('/', (req, res) => {
  console.log('ROUTER POST /games');
  const username = req?.body?.username;
  const score = parseInt(req?.body?.score, 10);
  const date = Date.now();

  if (!username || !score) {
    return res.sendStatus(400);
  }

  if (score < 0 || score > 3) {
    return res.sendStatus(400);
  }

  const game = saveGame(username, score, date);

  return res.json(game);
});

/* GET 3 questions listing. */
router.get('/start', (req, res) => {
  const difficulty = req?.body?.difficulty?.length !== 0
    ? req.body.difficulty
    : undefined;

  if (!difficulty) {
    const questions = readThreeQuestions();
    return res.json(questions);
  }

  const questions = readThreeQuestionsByDifficulty(difficulty);

  return res.json(questions);
});

module.exports = router;
