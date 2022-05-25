const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");


const guildLanguages = new Map();

module.exports = class ping extends BaseCommand {
    constructor() {
        super('lang', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, prefix) {
        if (message.member.permissions.has("MANAGE_GUILD")) {
            const [ cmdName, lang ] = message.content.slice(prefix.length).split(/\s+/);
            let newLang

            if (lang && lang.length <= 2) {
                if (lang === 'en') {
                    newLang = 'en_EN';
                } else if (lang === 'de') {
                    newLang = 'de_DE';
                } else return message.channel.send('Language not available!')

                try {
                    await StateManager.connection.query(
                        `UPDATE GuildConfigurable SET guildLanguage = '${newLang}' WHERE guildId = '${message.guild.id}'`
                    );
                    client.langs.set(message.guild.id, newLang)
                    message.channel.send(`Updated guild prefix to **${newLang}**`);
                } catch(err) {
                    console.log(err);
                    message.channel.send(`Failed to update guild prefix to **${newLang}**`);
                }
            } else {
                message.channel.send(`Incorrect amount of arguments`);
            }
        } else {
            message.channel.send('You do not have permission to use that command');
        }
    }
}