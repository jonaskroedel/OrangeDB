const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class Welcome extends BaseCommand {
    constructor() {
        super('welcome', 'modify', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        const lang = client.langs.get(message.guild.id);
        const { setwelcome, permissions } = require(`../../../utils/langs/${lang}.json`)

        let newWel = client.guildWelcomes.get(message.guild.id);

        if (!message.mentions.channels.first()) {
            if (!newWel) {
                return message.channel.send(setwelcome.no_welcome)
            }
        } else newWel = message.mentions.channels.first().id;

        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.channel.send(permissions.no_perm);
        } else {
            if (['remove', 'delete', 'clear'].includes(args[0])) {
                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable
                         SET guildWelcome = null
                         WHERE guildId = '${message.guild.id}'`
                    );
                    client.guildWelcomes.set(message.guild.id, null);
                    return message.channel.send(setwelcome.removed);

                } catch (err) {
                    console.log(err);
                    return message.channel.send(setwelcome.failure_remove);
                }
            }

            if (!message.mentions.channels.first()) {
                return message.channel.send(setwelcome.current.replaceAll('§welcome§', newWel));
            } else {
                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable
                         SET guildWelcome = '${newWel}'
                         WHERE guildId = '${message.guild.id}'`
                    );
                    client.guildWelcomes.set(message.guild.id, newWel)
                    return message.channel.send(setwelcome.updated.replaceAll('§welcome§', newWel));

                } catch (err) {
                    console.log(err);
                    return message.channel.send(setwelcome.failure_update.replaceAll('§welcome§', newWel));
                }
            }
        }
    }
}


