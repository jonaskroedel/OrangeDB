const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor () {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run (client, guild) {
        try {
            await StateManager.connection.query(
                `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerId}')`
            );
            await StateManager.connection.query(
                `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
            );
            console.log(`Added to db.`)
            StateManager.emit('guildAdded', guild.id, 'o!');
        } catch(err) {
            console.log(err);
        }
    }
}