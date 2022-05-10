const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

const guildWelcomes = new Map();

module.exports = class Welcome extends BaseCommand {
    constructor() {
        super('welcome', 'modify', []);
        this.connection = StateManager.connection;
    }

    async run(client, message) {

        let newWel;
        newWel = guildWelcomes.get(message.guild.id);
        if (message.mentions.channels.first()) {
            newWel = message.mentions.channels.first().id;
        }
        if (!message.mentions.channels.first()) {
            if (!guildWelcomes.get(message.guild.id)) {
                return message.channel.send('No Welcome channel defined.')
            }
        }

        if (message.mentions.channels.first()) {
            try {
                if (message.member.permissions.has("MANAGE_GUILD")) {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET guildWelcome = '${newWel}' WHERE guildId = '${message.guild.id}'`
                    );
                    message.channel.send(`Updated guild default welcome channel to <#${newWel}>`);
                    StateManager.emit('welcomeUpdate', message.guild.id, newWel);
                } else {
                    message.channel.send(`You do not have permission to use that command!`);
                }
            } catch (err) {
                console.log(err);
                message.channel.send(`Failed to update default Subreddit to **${newWel}**!`);
            }
        }
        else {
            message.channel.send(`Current Welcome Channel: <#${newWel}>`);
        }
    }
}

StateManager.on('welcomeFetched', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});

StateManager.on('welcomeUpdate', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});
