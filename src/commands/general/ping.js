// Dependencies

module.exports = {
  config: {
    name: 'ping',
    description: 'Pong!',
  },
  handler: async (bot, interaction) => {
    await interaction.reply('Command received, measuring latency...');
    const msg = await interaction.channel.send('Ping...');
    msg.edit(`**Pong!** \`${Date.now() - msg.createdAt}ms\``);
  },
};
