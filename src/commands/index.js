// Command categories
const commandsGeneral = require('./general/index');
const commandsGame = require('./game/index');

const commands = new Object();
const commandGeneralList = Object.keys(commandsGeneral);
const commandGameList = Object.keys(commandsGame);

commandGeneralList.forEach((commandName) => {
  commands[commandName] = commandsGeneral[commandName];
});

commandGameList.forEach((commandName) => {
  commands[commandName] = commandsGame[commandName];
});

module.exports = commands;
