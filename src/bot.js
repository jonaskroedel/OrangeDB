require('dotenv').config();
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});

const {registerCommands, registerEvents} = require('./utils/register');

(async () => {
    await client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');

})();