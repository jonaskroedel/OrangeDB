const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class StopCommand extends BaseCommand {
    constructor() {
        super('stop', 'music', []);
    }
    async run (client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({ embeds: [thing] });
            }

            const autoplay = player.get("autoplay");
            if (autoplay === true) {
                player.set("autoplay", false);
            }

            player.stop();
            player.queue.clear();

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ Music stopped.');
                return message.reply({ embeds: [thing] });
            }
        }
        else message.reply('There is no active music bot.')
    }
}
