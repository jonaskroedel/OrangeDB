const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('leave', 'music', []);
    }
    async run (client, message) {
        const lang = client.langs.get(message.guild.id);
        const { leave, musicdefault } = require(`../../../utils/langs/${lang}.json`)
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(musicdefault.no_bot);
                return message.reply({embeds: [thing]});
            }
            await player.destroy();

            let embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(leave.disconnected);
            return message.channel.send({ embeds: [embed] });
        } else return message.channel.send(musicdefault.no_bot)
    }
}