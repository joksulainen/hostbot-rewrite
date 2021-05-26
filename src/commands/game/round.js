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

let roundActive = false;
let round = undefined;

const handler = async (bot, interaction) => {
  const guild = bot.guilds.cache.get(config.guildId);
  const scoreChannel = guild.channels.cache.get(config.hosting.scoreChannelId);
  const lobbyChannel = guild.channels.cache.get(config.hosting.lobbyChannelId);
  await interaction.reply('Command received, processing...', { ephemeral: true });

  const calledSubcommand = interaction.options[0].name;
  if (calledSubcommand === 'start') {
    if (roundActive) return interaction.editReply('There is an ongoing round');
    const timeMs = interaction.options[0].options[0]?.value * 1000;
    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle('Round started')
      .setDescription('Go play that song!')
      .setTimestamp();
    scoreChannel.send(embed);
    interaction.editReply('Done!');
  } else if (calledSubcommand === 'end') {
    if (!roundActive) return interaction.editReply('There is no ongoing round');
    const embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Round ended')
      .setDescription('The round was ended prematurely.')
      .setTimestamp();
    scoreChannel.send(embed);
    interaction.editReply('Done!');
  } else if (calledSubcommand === 'cancel') {
    if (!roundActive) return interaction.editReply('There is no ongoing round');
    const embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Round cancelled')
      .setDescription('The round was cancelled. All scores are voided.')
      .setTimestamp();
    scoreChannel.send(embed);
    interaction.editReply('Done!');
  }
};

module.exports = {
  config: commandConfig,
  handler,
};
