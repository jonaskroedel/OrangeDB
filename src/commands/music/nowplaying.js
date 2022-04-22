const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { progressbar } = require("../../utils/progressbar.js");

module.exports = class now extends BaseCommand {
    constructor() {
        super('now', 'music', []);
    }

    async run (client, message, prefix) {
        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({ embeds: [thing] });
            }
            const song = player.queue.current;
            const current = player.position;

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(current)}
                                    ${progressbar(player)}`);
            return message.channel.send({ embeds: [embed] });
        }
        message.reply('There is no active music bot.')
    }
}