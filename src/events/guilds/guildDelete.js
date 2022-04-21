const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildDeleteEvent extends BaseEvent {
    constructor () {
        super('guildDelete');
        this.connection = StateManager.connection;
    }

    async run (client, guild) {try {
            await StateManager.connection.query(
                `DELETE FROM Guilds WHERE guildId = ('${guild.id}')`
            );
            await StateManager.connection.query(
                `DELETE FROM GuildConfigurable WHERE guildId = ('${guild.id}')`
            );
            console.log(`Removed from db.`);
        } catch(err) {
            console.log(err);
        }
    }
}