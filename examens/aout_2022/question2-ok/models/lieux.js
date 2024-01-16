/* eslint-disable padded-blocks */
/* eslint-disable indent */
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/places.json');

const defaultPlaces = [
  {
    id: 1,
    name: 'IPL',
    description: 'School',
  },
];

function registerPlace(name, description) {
    console.log('Function register');
    const places = parse(jsonDbPath, defaultPlaces);
    const place = places.find((u) => u.name === name);

    if (place) {
        return null;
    }

    const id = places.length + 1;
    const newPlace = {
        id,
        name,
        description,
    };
    places.push(newPlace);
    serialize(jsonDbPath, places);

    return newPlace.id;
}

module.exports = {
    registerPlace,
};
