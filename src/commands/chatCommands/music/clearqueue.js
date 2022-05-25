const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class clearQueue extends BaseCommand {
    constructor() {
        super('clearqueue', 'music', []);
    }

    async run(client, message) {
        const player = message.client.manager.get(message.guild.id);

        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`No active queue, start one with ${client.guildCommandPrefixes(message.guild.id)}play`);
                return message.channel.send({embeds: [embed]});
            }

            player.queue.clear();
            player.set("autoplay", false);

            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Queue cleared and autoplay disabled!`);
            return message.channel.send({embeds: [embed]});
        }
        message.channel.send('There is no active music bot.')
    }
}