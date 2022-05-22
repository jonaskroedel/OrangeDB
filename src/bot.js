require('dotenv').config({path: '../.env'});
const {Client, Intents, Collection} = require('discord.js');
const { Manager } = require('erela.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]});
const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/register');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

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