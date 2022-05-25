const BaseCommand = require('../../../../utils/structures/BaseCommand');
const StateManager = require('../../../../utils/StateManager');

const guildSubReddits = new Map();

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('subreddit', 'modify', ['sub', 'defaultsub']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        let newSub = args[0];

        if (!args[0] || args[0].length === 0) {
            return message.channel.send(`Current Subreddit: **r/${client.guildSubReddits.get(message.guild.id)}**`);
        } else {
            try {
                if (!message.member.permissions.has("MANAGE_GUILD")) {
                    return message.channel.send(`You do not have permission to use that command!`);
                } else {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET subReddit = '${newSub}' WHERE guildId = '${message.guild.id}'`
                    );
                    console.log(newSub)
                    message.channel.send(`Updated guild default subreddit to **${newSub}**`);
                    client.guildSubReddits.set(message.guild.id, newSub);
                }
            } catch (err) {
                console.log(err);
                message.channel.send(`Failed to update default Subreddit to **${newSub}**!`);
            }
        }
    }
}
