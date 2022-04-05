const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor () {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run (client, guild, message) {
        if (message.member.id === '521023008706658304') {
            try {
                await this.connection.query(
                    `INSERT INTO Guilds
                     VALUES ('${guild.id}', '${guild.ownerId}')`
                );
                await this.connection.query(
                    `INSERT INTO GuildConfigurable (guildId)
                     VALUES ('${guild.id}')`
                );
                console.log(`Added to db.`)
            } catch (err) {
                console.log(err);
            }
        } else message.channel.send(`You don't have enough permissions to execute this command.`)
    }
}