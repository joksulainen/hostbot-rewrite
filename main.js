'use strict';

// Dependencies
const { token } = require('./config');
const bot = require('./src/bot');

// Login using token
bot.login(token);
