'use strict';

// Dependencies
const config = require('../../../config');
const Discord = require('discord.js');

const commandConfig = {
  name: 'invite',
  description: 'Manage invites.',
  defaultPermission: false,
  permissions: [{
    id: config.hosting.hostRoleId,
    type: 'ROLE',
    permission: true,
  }],
  options: [{
    name: 'create',
    description: 'Create an invite.',
    type: 'SUB_COMMAND',
    options: [{
      name: 'time',
      description: 'Time in seconds.',
      type: 'INTEGER',
      required: true,
    }],
  }, {
    name: 'end',
    description: 'End an existing invite.',
    type: 'SUB_COMMAND',
  }, {
    name: 'cancel',
    description: 'Cancel an existing invite.',
    type: 'SUB_COMMAND',
  }],
};

const handler = async (bot, interaction) => {
  await interaction.reply('Placeholder');
};

module.exports = {
  config: commandConfig,
  handler,
};
