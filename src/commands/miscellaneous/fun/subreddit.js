const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

const guildSubReddits = new Map();

module.exports = class prefix extends BaseCommand {
    constructor() {
        super('subreddit', 'modify', []);
        this.connection = StateManager.connection;
    }

    async run(client, message) {


        const [cmdName, newSub] = message.content.slice(prefix.length).split(/\s+/);

        if (newSub && newSub.length <= 100) {
            try {
                if (message.member.permissions.has("MANAGE_GUILD")) {
                    await this.connection.query(
                        `UPDATE GuildConfigurable
                         SET subReddit = '${newSub}'
                         WHERE guildId = '${message.guild.id}'`
                    );
                    message.channel.send(`Updated guild default subreddit to **${newSub}**`);
                    StateManager.emit('subUpdate', message.guild.id, newSub);
                } else {
                    message.channel.send('You do not have permission to use that command');
                }
            } catch (err) {
                console.log(err);
                message.channel.send(`Failed to update default Subreddit to **${newSub}**`);
            }
        } else {
            message.channel.send(`Current Subreddit: **r/${guildSubReddits.get(message.guild.id)}**`);
        }
    }
}

StateManager.on('redditFetched', (guildId, subReddit) => {
    guildSubReddits.set(guildId, subReddit);
});

