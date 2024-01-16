/* eslint-disable no-plusplus */
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');
const pathUser = path.join(__dirname, '/../data/games.json');

const defaultQuestions = [];
const defaultGames = [];

function readThreeQuestionsByDifficulty(difficulty) {
  const questions = parse(jsonDbPath, defaultQuestions);
  const questionsByDifficulty = questions.filter((question) => question.level === difficulty);
  const threeQuestions = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * questionsByDifficulty.length);
    threeQuestions.push(questionsByDifficulty[randomIndex]);
    questionsByDifficulty.splice(randomIndex, 1);
  }
  return threeQuestions;
}

function readThreeQuestions() {
  const questions = parse(jsonDbPath, defaultQuestions);
  const threeQuestions = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    threeQuestions.push(questions[randomIndex]);
    questions.splice(randomIndex, 1);
  }
  return threeQuestions;
}

function saveGame(username, score, date) {
  const games = parse(pathUser, defaultGames);
  const game = {
    username,
    score,
    date,
  };
  games.push(game);
  serialize(pathUser, games);
  return game;
}

module.exports = {
  readThreeQuestionsByDifficulty,
  readThreeQuestions,
  saveGame,
};
