const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

const guildWelcomes = new Map();

module.exports = class Welcome extends BaseCommand {
    constructor() {
        super('welcome', 'modify', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {

        let newWel = guildWelcomes.get(message.guild.id);
        if (!message.mentions.channels.first()) {
            if (!guildWelcomes.get(message.guild.id)) {
                return message.channel.send('No Welcome channel defined.')
            }
        } else newWel = message.mentions.channels.first().id;

        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.channel.send(`You do not have permission to use that command!`);
        } else {
            if (['remove', 'delete', 'clear'].includes(args[0])) {
                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable
                         SET guildWelcome = null
                         WHERE guildId = '${message.guild.id}'`
                    );
                    StateManager.emit('welcomeUpdate', message.guild.id, null);
                    return message.channel.send(`Removed default welcome channel!`);

                } catch (err) {
                    console.log(err);
                    return message.channel.send(`Failed to remove default welcome channel!`);
                }
            }

            if (!message.mentions.channels.first()) {
                return message.channel.send(`Current Welcome channel: <#${newWel}>`);
            } else {
                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable
                         SET guildWelcome = '${newWel}'
                         WHERE guildId = '${message.guild.id}'`
                    );
                    StateManager.emit('welcomeUpdate', message.guild.id, newWel);
                    return message.channel.send(`Updated guild default welcome channel to <#${newWel}>`);

                } catch (err) {
                    console.log(err);
                    return message.channel.send(`Failed to update default welcome channel to **${newWel}**!`);
                }
            }
        }
    }
}

StateManager.on('welcomeFetched', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});

StateManager.on('welcomeUpdate', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});



