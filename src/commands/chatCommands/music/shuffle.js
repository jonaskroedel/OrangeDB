const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class StopCommand extends BaseCommand {
    constructor() {
        super('shuffle', 'music', []);
    }
    async run (client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.channel.send({embeds: [thing]});
            }

            player.queue.shuffle();

            let thing = new MessageEmbed()
                .setDescription(`Shuffled the queue`)
                .setColor("GREEN")
            return message.channel.send({embeds: [thing]});

        } else message.channel.send('There is no active music bot.');
    }
}
