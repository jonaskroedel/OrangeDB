const { MessageEmbed } = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the voice-channel'),

    async execute(client, interaction) {
        const player = interaction.client.manager.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            await player.destroy();

            let embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `❌ music bot disconnected!`
                );
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
        return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}