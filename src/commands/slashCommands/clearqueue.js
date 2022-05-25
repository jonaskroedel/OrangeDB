const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearqueue')
        .setDescription('Clears the current queue'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`No active queue, start one with ${client.guildCommandPrefixes.get(interaction.guild.id)}play`);
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

            player.queue.clear();
            player.set("autoplay", false);

            const embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Queue cleared and autoplay disabled!`);
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
        else return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}