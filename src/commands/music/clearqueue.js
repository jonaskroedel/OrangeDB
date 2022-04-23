const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");
const StateManager = require("../../utils/StateManager");

const guildCommandPrefixes = new Map();

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
                    .setDescription(`No active queue, start one with ${guildCommandPrefixes.get(message.guild.id)}play`);
                return message.channel.send({embeds: [embed]});
            }

            player.queue.clear();

            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Queue cleared.`);
            return message.channel.send({embeds: [embed]});
        }
        message.channel.send('There is no active music bot.')
    }
}

StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});