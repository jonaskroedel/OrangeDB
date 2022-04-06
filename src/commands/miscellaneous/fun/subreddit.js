const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class prefix extends BaseCommand {
    constructor() {
        super('subreddit', 'modify', []);
        this.connection = StateManager.connection;
    }

    async run (client, message) {

        if (message.member.permissions.has("MANAGE_GUILD")) {
            const [ cmdName, newSub ] = message.content.slice(prefix.length).split(/\s+/);

            if (newSub && newSub.length <= 100) {
                try {
                    await this.connection.query(
                        `UPDATE GuildConfigurable SET subReddit = '${newSub}' WHERE guildId = '${message.guild.id}'`
                    );
                    message.channel.send(`Updated guild default subreddit to **${newSub}**`);
                    StateManager.emit('subUpdate', message.guild.id, newSub);
                } catch(err) {
                    console.log(err);
                    message.channel.send(`Failed to update default Subreddit to **${newSub}**`);
                }
            } else {
                message.channel.send(`Incorrect amount of arguments`);
            }
        } else {
            message.channel.send('You do not have permission to use that command');
        }
    }
}

