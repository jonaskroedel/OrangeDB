const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require('../../utils/StateManager');

module.exports = class GuildCreateEvent extends BaseCommand {
    constructor () {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run (client, guild, message) {
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
    }
}