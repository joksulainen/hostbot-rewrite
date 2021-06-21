'use strict';

// Dependencies
const config = require('../config');
const Discord = require('discord.js');

console.time('startup');

// Create new Discord client
console.timeLog('startup', 'Creating client instance');
const bot = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// Import commands
console.timeLog('startup', 'Importing commands');
const commands = require('./commands');
const commandList = Object.keys(commands);

bot.once('ready', async () => {
  console.timeLog('startup', `Logged in as ${bot.user.tag}`);
  console.timeLog('startup', 'Getting guild');
  const guild = bot.guilds.cache.get(config.guildId);

  // Remove unused commands
  console.timeLog('startup', 'Removing unused commands');
  const collectedCommands = await guild.commands.fetch();
  for (const command of collectedCommands) {
    if (commandList.includes(command[0, 1].name)) continue;
    await guild.commands.delete(command[0]);
  }

  // Create commands from commandList
  console.timeLog('startup', 'Creating/updating commands');
  for (const commandName of commandList) {
    await guild.commands.create(commands[commandName].config);
  }

  // Set command permissions
  console.timeLog('startup', 'Setting command permissions');
  const commandCache = guild.commands.cache;
  for (const command of commandCache) {
    if (!commands[command[0, 1].name].config.permissions) continue;
    await command[0, 1].setPermissions(commands[command[0, 1].name].config.permissions);
  }

  console.timeLog('startup', 'Ready!');
  console.timeEnd('startup');
});

bot.on('interaction', async (interaction) => {
  // Execute command handler
  if (interaction.isCommand()) {
    console.log(`${new Date().toISOString()} Command '${interaction.commandName}' triggered`);
    if (commandList.includes(interaction.commandName)) {
      await commands[interaction.commandName].handler(bot, interaction);
      return;
    }
  }
});

// Export bot client to be executed in main.js
module.exports = bot;
