const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();
const guildSubReddits = new Map();

const cmdNames = new Map();
const cmdDescs = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }

    async run(client) {
        console.log(client.user.tag + ' has logged in.');
        client.guilds.cache.forEach(guild => {
            StateManager.connection.query(
                `SELECT cmdPrefix, subReddit FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const subReddit = result[0][0].subReddit;

                guildCommandPrefixes.set(guildId, prefix);
                guildSubReddits.set(guildId, subReddit)

                StateManager.emit('prefixFetched', guildId, prefix);
                StateManager.emit('redditFetched', guildId, subReddit);
            }).catch(err => console.log(err));
        });
        for (let i = 1; i <= 8; i++) {
            client.guilds.cache.forEach(guild => {
                StateManager.connection.query(
                    `SELECT * FROM ClientCommands WHERE nr = ${i}`
                ).then(result => {
                    const nr = result[0][0].nr;
                    const cmdName = result[0][0].cmdName;
                    const cmdDesc = result[0][0].cmdDesc;

                    cmdNames.get(nr, cmdName);
                    cmdDescs.get(nr, cmdDesc);

                    StateManager.emit('namesFetched', nr, cmdName);
                    StateManager.emit('descsFetched', nr, cmdDesc);


                }).catch(err => console.log(err));
            });
        }
        client.user.setActivity('o!help', {type: 'LISTENING'});
    }
}
