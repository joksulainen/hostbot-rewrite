// Dependencies
const config = require('./config.json');
require('dotenv').config();
const Discord = require('discord.js');

// Load .env and create new Discord client
const bot = new Discord.Client({
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const commands = {
	info: {
		config: {
			name: 'info',
			description: 'Info embed',
		},
		handler: async (interaction) => {
			const appInfo = await bot.application.fetch();
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`${appInfo.name} | Info`)
				.setDescription('Some bot lol')
				.setThumbnail(appInfo.iconURL())
				.setTimestamp()
				.setFooter(`Created by ${appInfo.owner.tag}`, appInfo.owner.displayAvatarURL({dynamic: true}));

			await interaction.reply(embed);
		},
	},
};
const commandList = Object.keys(commands);

bot.once('ready', async () => {
	commandList.forEach((commandName) => {
		bot.guilds.cache.get(config.guildId).commands.create(commands[commandName].config);
	});

	console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (commandList.includes(interaction.commandName)) {
		await commands[interaction.commandName].handler(interaction);
		return;
	}
});

bot.login(process.env.TOKEN);
