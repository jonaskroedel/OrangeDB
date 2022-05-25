const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class twentyforseven extends BaseCommand {
    constructor() {
        super('24/7', 'music', ['twentyfourseven']);
    }
    async run (client, message, prefix) {
        const lang = client.langs.get(message.guild.id);
        const { twentyfourseven, musicdefault } = require(`../../../utils/langs/${lang}.json`)
        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const [command, args] = message.content.slice(prefix.length).split(/\s+/);

            if (!args) {
                const embed = new MessageEmbed()
                    .setColor()
                    .setColor(`${player.twentyFourSeven === true ? "GREEN" : "RED"}`)
                    .setDescription(`${player.twentyFourSeven === true ? twentyfourseven.on : twentyfourseven.off}`);
                return message.channel.send({embeds: [embed]});
            } else if (args === 'off') {
                player.twentyFourSeven = false;
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(twentyfourseven.off);
                return message.channel.send({embeds: [embed]});
            } else if (args === 'on') {
                player.twentyFourSeven = true;
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(twentyfourseven.on);

                return message.channel.send({embeds: [embed]});
            } else {
                message.channel.send(twentyfourseven.onoff);
            }
        }
        else message.channel.send(musicdefault.no_bot)
    }
}