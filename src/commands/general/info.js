'use strict';

// Dependencies
const Discord = require('discord.js');
const { embedColor } = require('../../../config');

const commandConfig = {
  name: 'info',
  description: 'Info about the bot.',
};

const handler = async (bot, interaction) => {
  const appInfo = await bot.application.fetch();
  const embed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle(`${appInfo.name} | Info`)
    .setDescription('The same bot you know and love rewritten in Node.js to bring more control and slash commands')
    .setThumbnail(appInfo.iconURL({ dynamic: true }))
    .setFooter(`Created by ${appInfo.owner.tag}`, appInfo.owner.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
};

module.exports = {
  config: commandConfig,
  handler,
};
