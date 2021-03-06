const BaseCommand = require('../../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");

module.exports = class SkipCommand extends BaseCommand {
    constructor() {
        super('skipto', 'music', ['s']);
    }

    run(client, message, args) {
        const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return message.reply({embeds: [thing]});
        }

        const position = Number(args[0]);

        if (!position || position < 0 || position > player.queue.size) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You need to give a number smaller or equal to your queue size!`)
            return message.channel.send({embeds: [thing]});
        }

        player.queue.remove(0, position - 1);
        player.stop();

        let thing = new MessageEmbed()
            .setDescription(`Forward **${position}** Songs`)
            .setColor("GREEN")
        return message.channel.send({embeds: [thing]});

    }
}