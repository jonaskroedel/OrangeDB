const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class twentyforseven extends BaseCommand {
    constructor() {
        super('24/7', 'music', []);
    }
    async run (client, message, prefix) {
        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const [command, args] = message.content.slice(prefix.length).split(/\s+/);

            if (!args) {
                const embed = new MessageEmbed()
                    .setColor()
                    .setColor(`${player.twentyFourSeven === true ? "GREEN" : "RED"}`)
                    .setDescription(`${player.twentyFourSeven === true ? '24/7 is on' : '24/7 is off'}`);
                return message.channel.send({embeds: [embed]});
            } else if (args === 'off') {
                player.twentyFourSeven = false;
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('24/7 is off');
                return message.channel.send({embeds: [embed]});
            } else if (args === 'on') {
                player.twentyFourSeven = true;
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription('24/7 is on');

                return message.reply({embeds: [embed]});
            } else {
                message.channel.send('You can only use `on` or `off`');
            }
        }
        else message.channel.send('There is no active music bot.')
    }
}