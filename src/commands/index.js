'use strict';

// Dependencies
const fs = require('fs');
const path = require('path');

let commands = {};

// Get dir contents without index.js
const dirContents = fs.readdirSync(__dirname);
dirContents.splice(dirContents.indexOf(path.basename(__filename)));

for (const category of dirContents) {
  commands = Object.assign(commands, require(`./${category}`));
}

module.exports = commands;
