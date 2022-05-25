const BaseCommand = require('../../../../utils/structures/BaseCommand');
const StateManager = require('../../../../utils/StateManager');

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('subreddit', 'modify', ['sub', 'defaultsub']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        const lang = client.langs.get(message.guild.id);
        const { meme, permissions } = require(`../../../../utils/langs/${lang}.json`)
        let newSub = args[0];

        if (!args[0] || args[0].length === 0) {
            return message.channel.send(`${meme.current} **r/${client.guildSubReddits.get(message.guild.id)}**`);
        } else {
            try {
                if (!message.member.permissions.has("MANAGE_GUILD")) {
                    return message.channel.send(permissions.no_perm);
                } else {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET subReddit = '${newSub}' WHERE guildId = '${message.guild.id}'`
                    );
                    message.channel.send(`${meme.updated} **${newSub}**`);
                    client.guildSubReddits.set(message.guild.id, newSub);
                }
            } catch (err) {
                console.log(err);
                message.channel.send(`${meme.failure} **${newSub}**!`);
            }
        }
    }
}
