const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

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
            await StateManager.connection.query(
                `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result => {
                const prefix = result[0][0].cmdPrefix;
                StateManager.emit('guildAdded', guild.id, prefix);
                StateManager.emit('prefixUpdate', guild.id, prefix);
            });
            console.log(`Added to db.`);

        } catch(err) {
            console.log(err);
        }
    }
}