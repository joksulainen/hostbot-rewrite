'use strict';

// Dependencies
const fs = require('fs');
const path = require('path');

let commands = {};

// Get dir contents without index.js and template category
const dirContents = fs.readdirSync(__dirname);
dirContents.splice(dirContents.indexOf(path.basename(__filename)), 1);
dirContents.splice(dirContents.indexOf('template'), 1);

// Require each category
for (const category of dirContents) {
  commands = Object.assign(commands, require(`./${category}`));
}

module.exports = commands;
