'use strict';

// Dependencies
const { token } = require('./config.json');
const bot = require('./src/bot');

// Login using token
bot.login(token);
