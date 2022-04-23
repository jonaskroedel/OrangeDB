const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();
const guildSubReddits = new Map();

const cmdNames = new Map();
const cmdDescs = new Map();
const cmdCats = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }

    run(client) {
        console.log(client.user.tag + ' has logged in.');
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

        StateManager.connection.query(
            `SELECT COUNT(*) AS rowCount FROM ClientCommands`
        ).then(result => {
            const row = result[0][0].rowCount;

            for (let i = 1; i <= row; i++) {
                client.guilds.cache.forEach(guild => {
                    StateManager.connection.query(
                        `SELECT * FROM clientcommands WHERE listNr = ${i}`
                    ).then(result => {

                        const listNr = result[0][0].listNr;
                        const cmdName = result[0][0].cmdName;
                        const cmdDesc = result[0][0].cmdDesc;
                        const cmdCat = result[0][0].cats;

                        cmdNames.set(listNr, cmdName);
                        cmdDescs.set(listNr, cmdDesc);
                        cmdCats.set(listNr, cmdCat);

                        StateManager.emit('namesFetched', listNr, cmdName);
                        StateManager.emit('descsFetched', listNr, cmdDesc);
                        StateManager.emit('catsFetched', listNr, cmdCats);
                    }).catch(err => console.log(err));
                });
            }
        }).catch(err => console.log(err));
        client.user.setActivity('o!help', {type: 'LISTENING'});
    }
}