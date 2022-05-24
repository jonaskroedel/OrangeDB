const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('leave', 'music', []);
    }
    async run (client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            await player.destroy();

            let embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `❌ music bot disconnected`
                );
            return message.channel.send({ embeds: [embed] });
        }
        message.channel.send('There is no active music bot.')
    }
}