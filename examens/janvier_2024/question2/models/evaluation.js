/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/evaluation.json');
const citationPath = path.join(__dirname, '/../data/quotes.json');

const defaultEvaluation = [];

function ajouterEvaluation(id, score, name) {
    console.log('FUNCTION AJOUTER EVALUATION');
    const evaluations = parse(jsonDbPath, defaultEvaluation);
    const quotes = parse(citationPath, defaultEvaluation);

    // si la citation n'existe pas
    if (!quotes[id]) {
        return null;
    }

    // si l'évaluation existe déjà
    const evaluation = evaluations.find((e) => e.idQuote === id && e.username === name);

    if (evaluation) {
        console.log('Existing evaluation');
        return null;
    }

    const newEvaluation = {
        idQuote: id,
        username: name,
        score,
    };

    evaluations.push(newEvaluation);

    serialize(jsonDbPath, evaluations);

    return newEvaluation;
}

module.exports = {
    ajouterEvaluation,
};
