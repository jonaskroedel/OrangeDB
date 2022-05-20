require('dotenv').config({path: '../.env'});
const {Client, Intents, Collection} = require('discord.js');
const { Manager } = require('erela.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]});
const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/register');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const path = require("path");


/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

const commands = [];
const slashCommands = path.join(__dirname, '/commands/slashCommands');
const commandFiles = fs.readdirSync(slashCommands).filter(file => file.endsWith('.js'));

client.slashCommands = new Collection();

for (const file of commandFiles) {
    const command = require(`${slashCommands}/${file}`);
    commands.push(command.data.toJSON());
    client.slashCommands.set(command.data.name, command);
}

const rest = new REST({
    version: '9'
}).setToken(process.env.BOT_TOKEN);

// console.log(commands);

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

    try {
        await rest.put(
            Routes.applicationGuildCommands('961687947692867634', '841990439384907807'),
            { body: commands },
        );
        // await rest.post(
        //     Routes.applicationGuildCommands('961687947692867634', '841990439384907807'),
        //     { body: commands },
        // )

    } catch (err) {
        console.log(err)
    }

    client.login(process.env.BOT_TOKEN);

    client.musicPlayers = new Map();
    client.commands = new Collection();
    await registerMusicEvents(client.manager, '../musicevents')
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
})();