'use strict';

// Command categories
const commandsGeneral = require('./general');
const commandsGame = require('./game');

const commands = Object.assign({}, commandsGeneral, commandsGame);

module.exports = commands;
