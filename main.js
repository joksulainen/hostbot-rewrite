// Dependencies
const { token } = require('./config.json');
const bot = require('./src/bot.js');

// Login using token
bot.login(token);
