'use strict';

// Dependencies

const commandConfig = {
  name: 'rng',
  description: 'Returns a random integer between min and max (both inclusive).',
  options: [{
    name: 'max',
    description: 'Max value (Default: 6)',
    type: 'INTEGER',
  }, {
    name: 'min',
    description: 'Min value (Default: 1)',
    type: 'INTEGER',
  }],
};

const handler = async (bot, interaction) => {
  const max = interaction.options.get('max')?.value || 6;
  const min = interaction.options.get('min')?.value || 1;
  if (min > max) return await interaction.reply({ content: `${min} <= Result <= ${max}\nResult: Try again` });
  const result = Math.floor(Math.random() * (max - min + 1) + min);

  await interaction.reply({ content: `${min} <= Result <= ${max}\nResult: ${result}` });
};

module.exports = {
  config: commandConfig,
  handler,
};
