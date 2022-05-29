const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class clearQueue extends BaseCommand {
    constructor() {
        super('clearqueue', 'music', []);
    }

    async run(client, message) {
        const lang = client.langs.get(message.guild.id);
        const { clearqueue, musicdefault } = require(`../../../utils/langs/${lang}.json`)
        const player = message.client.manager.get(message.guild.id);

        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(musicdefault.no_bot);
                return message.reply({embeds: [thing]});
            }

            player.queue.clear();
            player.set("autoplay", false);

            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(clearqueue.done);
            return message.channel.send({embeds: [embed]});
        }
        message.channel.send(musicdefault.no_bot)
    }
}