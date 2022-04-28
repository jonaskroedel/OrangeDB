const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
require('dotenv').config({path: '../.env'});

const guildCommandPrefixes = new Map();
const guildSubReddits = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }
    run(client) {
        let ids = client.guilds.cache.map(g => g.id);
        console.log(client.user.tag + ' has logged in.');

        for (let i = 0; i < ids.length; i++) {
            StateManager.connection.query(
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
            StateManager.connection.query(
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

        client.guilds.cache.forEach(guild => {
            StateManager.connection.query(
                `SELECT cmdPrefix, subReddit FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const subReddit = result[0][0].subReddit;

                guildCommandPrefixes.set(guildId, prefix);
                guildSubReddits.set(guildId, subReddit);

                StateManager.emit('prefixFetched', guildId, prefix);
                StateManager.emit('redditFetched', guildId, subReddit);
            }).catch(err => console.log(err));
        });
        client.user.setActivity(process.env.PREFIX, {type: 'LISTENING'});
    }
}