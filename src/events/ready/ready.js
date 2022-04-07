const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();
const guildSubReddits = new Map();

module.exports = class ReadyEvent extends BaseEvent {

    constructor () {
        super('ready');
        this.connection = StateManager.connection;
    }

    async run (client) {
        console.log(client.user.tag + ' has logged in.');
        client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT cmdPrefix, subReddit FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const subReddit = result[0][0].subReddit;

                guildCommandPrefixes.set(guildId, prefix);
                guildSubReddits.set(guildId, subReddit)

                const sub = guildSubReddits.get(guild.id);

                StateManager.emit('prefixFetched', guildId, prefix);
                StateManager.emit('redditFetched', guildId, subReddit);
            }).catch(err => console.log(err));
        });
        client.user.setActivity('o!help', { type: 'LISTENING' });
    }

}