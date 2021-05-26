'use strict';

// Dependencies
const Discord = require('discord.js');
const sql3 = require('sqlite3');
const sql = require('sqlite');
const config = require('../../../config');
const utils = require('../../utils');
const helpers = require('../../helpers');

const commandConfig = {
  name: 'songcheck',
  description: 'Send a message and ask participants to voice ownership of the given song.',
  defaultPermission: false,
  permissions: [{
    id: config.hosting.hostRoleId,
    type: 'ROLE',
    permission: true,
  }],
  options: [{
    name: 'songid',
    description: 'Song ID',
    type: 'STRING',
    required: true,
  }, {
    name: 'difficulty',
    description: 'Difficulty',
    type: 'STRING',
    required: true,
    choices: [{
      name: 'beyond',
      value: 'byn',
    }, {
      name: 'future',
      value: 'ftr',
    }, {
      name: 'present',
      value: 'prs',
    }, {
      name: 'past',
      value: 'pst',
    }],
  }],
};

const handler = async (bot, interaction) => {
  await interaction.reply('Command received, processing...', { ephemeral: true });
  const guild = bot.guilds.cache.get(config.guildId);
  const lobbyChannel = guild.channels.cache.get(config.hosting.lobbyChannelId);
  const songDb = await sql.open({
    filename: config.dbPath,
    mode: sql.OPEN_READONLY,
    driver: sql3.Database,
  });

  const _songId = interaction.options[0].value.toLowerCase();
  const _diff = interaction.options[1].value;

  // Get song details
  const sqlQuery = `SELECT name_en name, pakset pack, difficultly_${_diff} diff FROM songs WHERE sid = '${_songId}'`;
  const result = await songDb.get(sqlQuery);
  await songDb.close();

  if (!result['name']) {
    interaction.editReply('This song doesn\'t exist');
    return;
  } else if (result['diff'] === -1) {
    interaction.editReply('This song doesn\'t have beyond difficulty');
    return;
  }

  const songName = result['name'];
  const songPack = helpers.parseSongPack[result['pack']];
  let songDifficulty = '';

  songDifficulty = `${_diff} ${utils.parseDisplayDiff(result['diff'])}`;
  songDifficulty = songDifficulty.replace('byn', 'byd').toUpperCase();

  const embed = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setTitle('Song check')
    .setDescription('Please check that you own this song')
    .addFields(
      { name: 'Title', value: songName, inline: true },
      { name: 'Pack', value: songPack, inline: true },
      { name: 'Difficulty', value: songDifficulty, inline: true },
    )
    .setTimestamp();

  const msg = await lobbyChannel.send(embed);
  msg.react(config.hosting.songOwned);
  bot.setTimeout(async () => {
    msg.react(config.hosting.songNotOwned);
  }, 500);

  await interaction.editReply('Done!');
};

module.exports = {
  config: commandConfig,
  handler,
};
