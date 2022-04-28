const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class prefix extends BaseCommand {
    constructor() {
        super('prefix', 'modify', ['chprefix', 'defaultprefix']);
    }

    async run (client, message) {

        if (message.member.permissions.has("MANAGE_GUILD")) {
            const [ cmdName, newPrefix ] = message.content.slice(prefix.length).split(/\s+/);

            if (newPrefix && newPrefix.length <= 10) {
                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
                    );
                    StateManager.emit('prefixUpdate', message.guild.id, newPrefix);
                    message.channel.send(`Updated guild prefix to **${newPrefix}**`);
                } catch(err) {
                    console.log(err);
                    message.channel.send(`Failed to update guild prefix to **${newPrefix}**`);
                }
            } else {
                message.channel.send(`Incorrect amount of arguments`);
            }
        } else {
            message.channel.send('You do not have permission to use that command');
        }
    }
}
