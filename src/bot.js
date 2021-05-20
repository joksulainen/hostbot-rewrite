// Dependencies
const config = require('../config.json');
const Discord = require('discord.js');

// Create new Discord client
const bot = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// Import commands
const commands = require('./commands/index');
const commandList = Object.keys(commands);

bot.once('ready', async () => {
  const guild = bot.guilds.cache.get(config.guildId);
  // Remove all commands (To flush out unused commands)
  const collectedCommands = await guild.commands.fetch();
  collectedCommands.forEach(async (command) => {
    await guild.commands.delete(command);
  });

  // Create commands from commandList
  commandList.forEach(async (commandName) => {
    await guild.commands.create(commands[commandName].config);
  });

  console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('interaction', async (interaction) => {
  // Execute command handler
  if (!interaction.isCommand()) return;
  if (commandList.includes(interaction.commandName)) {
    await commands[interaction.commandName].handler(bot, interaction);
    return;
  }
});

// Export bot client to be executed in main.js
module.exports = bot;