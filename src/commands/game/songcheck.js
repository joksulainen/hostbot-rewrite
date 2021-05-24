'use strict';

// Dependencies
const Discord = require('discord.js');
const sql = require('sqlite');
const config = require('../../../config');

const commandConfig = {
  name: 'songcheck',
  description: 'Send a message and ask participants to voice ownership of the given song.',
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
  const songDb = new sql.Database(config.dbPath, sql.OPEN_READONLY, (error) => {
    if (error) {
      interaction.editReply('An error occurred while connecting to database');
      return;
    }
  });

  // Get song name
  let songName = interaction.options[0].value;

  // Get song pack
  let songPack = 'Arcaea';

  // Get song difficulty
  let songDifficulty = interaction.options[1].value;
  songDifficulty = songDifficulty.replace('byn', 'byd').toUpperCase();

  const appInfo = await bot.application.fetch();
  const embed = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setAuthor(appInfo.name, appInfo.iconURL({ dynamic: true }))
    .setTitle('Song check')
    .setDescription('Please check that you own this song')
    .addFields(
      { name: 'Title', value: songName, inline: true },
      { name: 'Pack', value: songPack, inline: true },
      { name: 'Difficulty', value: songDifficulty, inline: true },
    )
    .setTimestamp();

  const msg = await interaction.channel.send(embed);
  msg.react(config.hosting.songCheckEmojis.owned);
  bot.setTimeout(() => {
    msg.react(config.hosting.songCheckEmojis.notOwned);
  }, 500);

  songDb.close((error) => {
    if (error) {
      interaction.editReply('An error occurred while closing the database connection');
      return;
    }
  });

  await interaction.editReply('Done!');
};

module.exports = {
  config: commandConfig,
  handler,
};
