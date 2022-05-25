const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class prefix extends BaseCommand {
    constructor() {
        super('prefix', 'modify', ['chprefix', 'defaultprefix']);
        this.connection = StateManager.connection;
    }

    async run (client, message) {
        const lang = client.langs.get(message.guild.id);
        const { prefix, permissions } = require(`../../../utils/langs/${lang}.json`)

        if (message.member.permissions.has("MANAGE_GUILD")) {
            const [ cmdName, newPrefix ] = message.content.slice(prefix.length).split(/\s+/);

            if (newPrefix && newPrefix.length <= 10) {
                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
                    );
                    client.guildCommandPrefixes.set(message.guild.id, newPrefix);
                    message.channel.send(prefix.updated.replaceAll('§prefix§', newPrefix));
                } catch(err) {
                    console.log(err);
                    message.channel.send(prefix.error.replaceAll('§prefix§', newPrefix));
                }
            } else {
                message.channel.send(permissions.no_args);
            }
        } else {
            message.channel.send(permissions.no_perm);
        }
    }
}
