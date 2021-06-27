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

let round = undefined;

const handler = async (bot, interaction) => {
  await interaction.reply({ content: 'Command received, processing...', ephemeral: true });
  const guild = bot.guilds.cache.get(config.guildId);
  const scoreChannel = guild.channels.cache.get(config.hosting.scoreChannelId);
  const lobbyChannel = guild.channels.cache.get(config.hosting.lobbyChannelId);

  const invokedSubcommand = interaction.options.first().name;
  if (invokedSubcommand === 'start') {
    if (round) return await interaction.editReply({ content: 'There is an ongoing round' });
    const timeS = interaction.options.get('start')?.options.get('time').value;
    const timeMs = timeS * 1000;
    const _minutes = Math.floor(timeS / 60);
    const _seconds = ((timeS % 60) < 10) ? `0${timeS % 60}` : String(timeS % 60);

    const scoreEmbed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle('Round started')
      .setDescription('Go play that song!')
      .setTimestamp();

    const lobbyEmbed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setTitle('Round has begun')
      .setDescription(`Beat the song in __${_minutes}:${_seconds}__. Good luck!`)
      .setTimestamp();

    await lobbyChannel.send({ embeds: [lobbyEmbed] });
    await scoreChannel.send({ embeds: [scoreEmbed] });
  } else if (invokedSubcommand === 'end') {
    if (!round) return interaction.editReply({ content: 'There is no ongoing round' });
    const embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Round ended')
      .setDescription('The round was ended prematurely.')
      .setTimestamp();

    await scoreChannel.send({ embeds: [embed] });
  } else if (invokedSubcommand === 'cancel') {
    if (!round) return interaction.editReply({ content: 'There is no ongoing round' });
    const embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Round cancelled')
      .setDescription('The round was cancelled. All scores are void.')
      .setTimestamp();

    await scoreChannel.send({ embeds: [embed] });
  }

  await interaction.editReply({ content: 'Done!' });
};

module.exports = {
  config: commandConfig,
  handler,
};
