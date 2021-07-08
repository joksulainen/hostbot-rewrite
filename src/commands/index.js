'use strict';

// Dependencies
const fs = require('fs');
const path = require('path');

const commands = {};

// Get dir contents without index.js
const categories = fs.readdirSync(__dirname);
categories.splice(categories.indexOf(path.basename(__filename)), 1);

// Require each command
for (const category of categories) {
  const contents = fs.readdirSync(__dirname + `/${category}`);
  for (const item of contents) {
    commands[path.basename(item, path.extname(item))] = require(`./${category}/${item}`);
  }
}

module.exports = commands;
