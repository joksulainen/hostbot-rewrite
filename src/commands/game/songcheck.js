// Dependencies
const config = require('../../../config');
const Discord = require('discord.js');

module.exports = {
  config: {
    name: 'songcheck',
    description: 'Send a message and ask participants to voice ownership of the given song',
    options: [{
      name: 'songid',
      description: 'Song ID',
      type: 'STRING',
      required: true,
    },
    {
      name: 'difficulty',
      description: 'Difficulty',
      type: 'STRING',
      required: true,
      choices: [{
        name: 'beyond',
        value: 'byn',
      },
      {
        name: 'future',
        value: 'ftr',
      },
      {
        name: 'present',
        value: 'prs',
      },
      {
        name: 'past',
        value: 'pst',
      }],
    }],
  },
  handler: async (bot, interaction) => {
    const appInfo = await bot.application.fetch();
    const embed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setAuthor(appInfo.name, appInfo.iconURL({ dynamic: true }))
      .setTitle('Song check')
      .setDescription('Please check that you own this song')
      .addFields(
        { name: 'Title', value: interaction.options[0].value, inline: true },
        { name: 'Pack', value: 'Arcaea', inline: true },
        { name: 'Difficulty', value: interaction.options[1].value, inline: true },
      )
      .setTimestamp();

    await interaction.reply('Command received, processing...', { ephemeral: true });
    const msg = await interaction.channel.send(embed);
    msg.react('👍');
    bot.setTimeout(() => {
      msg.react('👎');
    }, 500);
  },
};
