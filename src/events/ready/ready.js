const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const path = require("path");
const fs = require("node:fs");
const {Collection} = require("discord.js");
require('dotenv').config({path: '../.env'});

const guildCommandPrefixes = new Map();
const guildSubReddits = new Map();
const guildVolumes = new Map();
const guildWelcomes = new Map();
const guildLanguages = new Map();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({
    version: '9'
}).setToken(process.env.BOT_TOKEN);



/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }
    async run(client) {
        console.log(client.user.tag + ' has logged in.');

        // start of ( / ) cmds refreshing

        const commands = [];
        const slashCommands = path.join(__dirname, '../../commands/slashCommands');
        const commandFiles = fs.readdirSync(slashCommands).filter(file => file.endsWith('.js'));

        client.slashCommands = new Collection();
        client.langs = new Collection();

        for (const file of commandFiles) {
            const command = require(`${slashCommands}/${file}`);
            commands.push(command.data.toJSON());
            client.slashCommands.set(command.data.name, command);

        }

        try {
            await rest.put(
                Routes.applicationGuildCommands('961687947692867634', '841990439384907807'),
                { body: commands },
            );

        } catch (err) {
            console.log(err)
        }

        // End of section

        // Start of checking if all Guild-Ids are in the database
        const ids = client.guilds.cache.map(g => g.id);
        let gids = [];

        await StateManager.connection.query(
            `SELECT COUNT(*) AS rowCount FROM GuildConfigurable`
        ).then(async result => {
            const row = result[0][0].rowCount;

            for (let i = 0; i < row; i++)
                await StateManager.connection.query(
                    `SELECT guildId
                     FROM GuildConfigurable LIMIT ${i},1`
                ).then(result => {
                    const gid = result[0][0].guildId;
                    gids.push(gid);
                });
        });

        for (let i = 0; i < ids.length; i++) {
            await StateManager.connection.query(
                `SELECT * FROM Guilds WHERE guildId = '${ids[i]}'`
            ).then(result => {
                try {
                    if (!result[0][0]) {
                        try {
                            StateManager.connection.query(
                                `INSERT INTO Guilds VALUES ('${ids[i]}', '${client.guilds.resolve(ids[i]).ownerId}')`
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }

        for (let i = 0; i < ids.length; i++) {
            await StateManager.connection.query(
                `SELECT * FROM GuildConfigurable WHERE guildId = '${ids[i]}'`
            ).then(result => {
                try {
                    if (!result[0][0]) {
                        try {
                            StateManager.connection.query(
                                `INSERT INTO GuildConfigurable (guildId) VALUES ('${ids[i]}')`
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }
        // End of section
        // Start of getting all data out of the database

        client.guilds.cache.forEach(guild => {
            StateManager.connection.query(
                `SELECT cmdPrefix, subReddit, guildWelcome, guildVolume, guildLanguage FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const subReddit = result[0][0].subReddit;
                const guildVolume = result[0][0].guildVolume;
                const guildWelcome = result[0][0].guildWelcome;
                const guildLanguage = result[0][0].guildLanguage;

                guildCommandPrefixes.set(guildId, prefix);
                guildSubReddits.set(guildId, subReddit);
                guildVolumes.set(guildId, guildVolume);
                guildWelcomes.set(guildId, guildWelcome);
                client.langs.set(guildId, guildLanguage)

                StateManager.emit('prefixFetched', guildId, prefix);
                StateManager.emit('redditFetched', guildId, subReddit);
                StateManager.emit('volumeFetched', guildId, guildVolume);
                StateManager.emit('welcomeFetched', guildId, guildWelcome);
                console.log('StateManger finished!')
            }).catch(err => console.log(err));
        });
        // End of section


        // await client.application.commands.set([])
        client.user.setActivity(`${process.env.PREFIX}help`, {type: 'LISTENING'});
    }
}