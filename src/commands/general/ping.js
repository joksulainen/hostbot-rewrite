'use strict';

// Dependencies

const commandConfig = {
  name: 'ping',
  description: 'Pong!',
};

const handler = async (bot, interaction) => {
  await interaction.reply(`**Pong!** My ping is \`${bot.ws.ping}ms\``);
};

module.exports = {
  config: commandConfig,
  handler,
};
