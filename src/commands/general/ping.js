'use strict';

// Dependencies

const commandConfig = {
  name: 'ping',
  description: 'Pong!',
};

const handler = async (bot, interaction) => {
  await interaction.reply('Command received, measuring latency...');
  const msg = await interaction.channel.send('Ping...');
  msg.edit(`**Pong!** \`${Date.now() - msg.createdAt}ms\``);
  interaction.editReply('Done!');
};

module.exports = {
  config: commandConfig,
  handler,
};
