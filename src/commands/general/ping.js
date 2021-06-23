'use strict';

// Dependencies

const commandConfig = {
  name: 'ping',
  description: 'Pong!',
};

const handler = async (bot, interaction) => {
  await interaction.reply(`**Pong!** Your ping is \`${Date.now() - interaction.createdAt}ms\``);
};

module.exports = {
  config: commandConfig,
  handler,
};
