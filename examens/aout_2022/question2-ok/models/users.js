/* eslint-disable padded-blocks */
/* eslint-disable indent */
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const userDbPath = path.join(__dirname, '/../data/users.json');
const placeDbPath = path.join(__dirname, '/../data/places.json');
const favoritesPath = path.join(__dirname, '/../data/favorites.json');

const defaultUsers = [];
const defaultPlaces = [];
const defaultFavorites = [];

function register(name, password) {
    console.log('Function register user');
    const users = parse(userDbPath, defaultUsers);
    const user = users.find((u) => u.name === name);

    if (user) {
        return null;
    }

    const id = users.length + 1;
    const newUser = {
        id,
        name,
        password,
    };
    users.push(newUser);
    serialize(userDbPath, users);

    return newUser;
}

function registerFavorite(userId, placeId) {
    console.log('Function register user');
    const users = parse(userDbPath, defaultUsers);
    const places = parse(placeDbPath, defaultPlaces);

    const user = users.find((u) => u.id === userId);
    if (user <= 0) {
        return null;
    }

    const place = places.find((p) => p.id === placeId);
    if (place <= 0) {
        return null;
    }

    const favorites = parse(favoritesPath, defaultFavorites);
    const userFavorite = favorites.find((f) => f.userId === userId);

    // si userFavorite existe et possède déjà le placeId
    if (userFavorite && userFavorite.placeId.includes(placeId)) {
        return null;
    }
    // si userFavorite existe et ne possède pas le placeId
    if (userFavorite && !userFavorite.placeId.includes(placeId)) {
        userFavorite.placeId.push(placeId);
        serialize(favoritesPath, favorites);
        return userFavorite;
    }
    // si userFavorite n'existe pas
    const newFavorite = {
        userId,
        placeId: [placeId],
    };
    favorites.push(newFavorite);
    serialize(favoritesPath, favorites);
    return newFavorite;
}

module.exports = {
    register,
    registerFavorite,
};
