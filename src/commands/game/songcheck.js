'use strict';

// Dependencies
const Discord = require('discord.js');
const sql3 = require('sqlite3');
const sql = require('sqlite');
const fs = require('fs');
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
  if (!config.dbPath) return await interaction.editReply('Song database path is empty in config');
  const guild = bot.guilds.cache.get(config.guildId);
  const lobbyChannel = guild.channels.cache.get(config.hosting.lobbyChannelId);
  const songDb = await sql.open({
    filename: config.dbPath,
    mode: sql.OPEN_READONLY,
    driver: sql3.Database,
  })
    .catch(async (error) => {
      return await interaction.editReply(error);
    });

  const _songId = interaction.options[0].value.toLowerCase();
  const _diff = interaction.options[1].value;

  // Get song details
  const sqlQuery = `SELECT name_en name, pakset pack, difficultly_${_diff} difficulty, notes_${_diff} noteCount, bpm, rating_${_diff} cc, time duration
    FROM songs WHERE sid = '${_songId}'`;
  const result = await songDb.get(sqlQuery);
  await songDb.close();

  if (!result) {
    return await interaction.editReply('This song doesn\'t exist.');
  }
  if (result['difficulty'] === -1) return await interaction.editReply('This song doesn\'t have beyond difficulty.');

  const songName = result['name'];
  const songPack = helpers.parseSongPack[result['pack']];
  const songDifficulty = `${_diff} ${utils.parseDisplayDiff(result['difficulty'])}`.replace('byn', 'byd').toUpperCase();
  const songNoteCount = result['noteCount'];
  const songBPM = result['bpm'];
  const songCC = result['cc'] / 10;
  const _minutes = Math.floor(result['duration'] / 60);
  const _seconds = ((result['duration'] % 60) < 10) ? `0${result['duration'] % 60}` : String(result['duration'] % 60);
  const songDuration = `${_minutes}:${_seconds}`;

  const embed = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setTitle('Song check')
    .setDescription('Please check that you own this song')
    .addFields(
      { name: 'Title', value: songName, inline: true },
      { name: 'Pack', value: songPack, inline: true },
      { name: 'Difficulty', value: songDifficulty, inline: true },
      { name: 'Notes', value: songNoteCount, inline: true },
      { name: 'BPM', value: songBPM, inline:  true },
      { name: 'Chart Constant', value: songCC, inline: true },
      { name: 'Duration', value: songDuration, inline: true },
    )
    .setTimestamp();

  // Get song jacket and attach it
  let fileName = _songId;
  if (_diff === 'byn') {
    fileName = fileName + '_byn';
  } else if (_songId === 'stager') {
    fileName = `${fileName}_${_diff}`;
  }

  const dirContents = fs.readdirSync('./src/img/song_jackets');
  for (const file of dirContents) {
    if (file.includes(fileName)) {
      fileName = file;
      break;
    }
  }

  embed.attachFiles([`./src/img/song_jackets/${fileName}`])
    .setImage(`attachment://${fileName}`);

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
