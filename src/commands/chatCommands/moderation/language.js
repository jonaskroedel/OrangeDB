const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");

module.exports = class ping extends BaseCommand {
    constructor() {
        super('lang', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, prefix) {
        const lang = client.langs.get(message.guild.id);
        const { language, permissions } = require(`../../../utils/langs/${lang}.json`)
        if (message.member.permissions.has("MANAGE_GUILD")) {
            const [ cmdName, lang ] = message.content.slice(prefix.length).split(/\s+/);
            let newLang

            if (lang && lang.length <= 2) {
                if (lang === 'en') {
                    newLang = 'en_EN';
                } else if (lang === 'de') {
                    newLang = 'de_DE';
                } else return message.channel.send(language.not_available)

                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET guildLanguage = '${newLang}' WHERE guildId = '${message.guild.id}'`
                    );
                    client.langs.set(message.guild.id, newLang)
                    message.channel.send(language.updated.replaceAll('§language§', newLang));
                } catch(err) {
                    console.log(err);
                    message.channel.send(language.error.replaceAll('§language§', newLang));
                }
            } else {
                message.channel.send(permissions.no_args);
            }
        } else {
            message.channel.send(permissions.no_perm);
        }
    }
}