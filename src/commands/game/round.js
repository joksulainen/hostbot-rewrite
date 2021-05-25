'use strict';

// Dependencies
const config = require('../../../config.json');
const Discord = require('discord.js');

const commandConfig = {
  name: 'round',
  description: 'Manage rounds.',
  defaultPermission: false,
  permissions: [{
    id: config.hosting.hostRoleId,
    type: 'ROLE',
    permission: true,
  }],
  options: [{
    name: 'start',
    description: 'Start a round.',
    type: 'SUB_COMMAND',
    options: [{
      name: 'time',
      description: 'Time in seconds.',
      type: 'INTEGER',
      required: true,
    }],
  }, {
    name: 'end',
    description: 'End a round.',
    type: 'SUB_COMMAND',
  }, {
    name: 'cancel',
    description: 'Cancel an ongoing round.',
    type: 'SUB_COMMAND',
  }],
};

const handler = async (bot, interaction) => {
  await interaction.reply('Command received, processing...', { ephemeral: true });
  const appInfo = await bot.application.fetch();

  const scoreEmbed = new Discord.MessageEmbed()
    .setAuthor(appInfo.name, appInfo.iconURL({ dynamic: true }))
    .setTimestamp();

  const lobbyEmbed = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setAuthor(appInfo.name, appInfo.iconURL({ dynamic: true }))
    .setTimestamp();

  const calledSubcommand = interaction.options[0].name;
  if (calledSubcommand === 'start') {
    const timeMs = interaction.options[0].options[0]?.value * 1000;
    scoreEmbed.setColor('#00ff00')
      .setTitle('Round started')
      .setDescription('Go play that song!');
  } else if (calledSubcommand === 'end') {
    scoreEmbed.setColor('#ff0000')
      .setTitle('Round ended')
      .setDescription('The round was ended prematurely.');
  } else if (calledSubcommand === 'cancel') {
    scoreEmbed.setColor('#ff0000')
      .setTitle('Round cancelled')
      .setDescription('The round was cancelled. All scores are voided.');
  }
  await interaction.editReply('Done!');
};

module.exports = {
  config: commandConfig,
  handler,
};
