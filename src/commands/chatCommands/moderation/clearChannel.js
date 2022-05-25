const BaseCommand = require("../../../utils/structures/BaseCommand");

module.exports = class clearChannel extends BaseCommand {
    constructor() {
        super('clearchannel', 'moderation', ['clone', 'cc']);
    }

    async run (client, message) {
        const lang = client.langs.get(message.guild.id);
        const { clearchannel, permissions } = require(`../../../utils/langs/${lang}.json`)
        if (message.member.permissions.has("MANAGE_CHANNELS") && message.member.permissions.has("MANAGE_MESSAGES")) {
            let channel = message.channel;
            let nchannel = await channel.clone();
            await message.reply(clearchannel.old_channel.replaceAll('§channel§', channel).replaceAll('§nchannel§', nchannel));
            let msg1 = await nchannel.send(clearchannel.new_channel.replaceAll('§user§', message.member.user));
            setTimeout(() => {
                msg1.delete();
            }, 4000);
            setTimeout(() => {
                channel.delete();
            }, 5000);
        } else {
            await message.channel.send(permissions.no_perm);
            message.delete();
        }
    }
}