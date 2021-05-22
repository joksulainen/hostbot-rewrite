'use strict';

// Dependencies
const fs = require('fs');
const path = require('path');

const commands = {};

// Get dir contents without index.js
const dirContents = fs.readdirSync(__dirname);
dirContents.splice(dirContents.indexOf(path.basename(__filename)), 1);

for (const file of dirContents) {
  commands[path.basename(file, path.extname(file))] = require(`./${file}`);
}

module.exports = commands;
