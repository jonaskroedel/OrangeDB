require('dotenv').config({path: '../.env'});
const {Client, Intents, Collection} = require('discord.js');
const { Manager } = require('erela.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_VOICE_STATES"]});
const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/register');

(async () => {
    const nodes= [
        {
            host: process.env.HOST,
            password : process.env.PASSWORD,
            port: Number(process.env.PORT),
            secure: false
        }
    ];

    client.manager = new Manager({
        nodes,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    });

    client.once("ready", () => {
        client.manager.init(client.user.id);
    });
    client.on("raw", d => client.manager.updateVoiceState(d));

    client.login(process.env.BOT_TOKEN);

    client.musicPlayers = new Map();
    client.commands = new Collection();
    await registerMusicEvents(client.manager, '../musicevents')
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
})();