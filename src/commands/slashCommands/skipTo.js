const {MessageEmbed} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('Shuffles the current queue')
        .addIntegerOption(option =>
            option.setName('songnr')
                .setDescription('Skips to the song in the current queue')),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription("There is no music playing.");
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            const position = Number(args[0]);

            if (!position || position < 0 || position > player.queue.size) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You need to give a number smaller or equal to your queue size!`)
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            player.queue.remove(0, position - 1);
            player.stop();

            let thing = new MessageEmbed()
                .setDescription(`Forward **${position}** Songs`)
                .setColor("GREEN")
            return interaction.reply({
                embeds: [thing],
                ephemeral: true
            });

        } else return interaction.reply({
            content: 'There is no active music bot.',
            ephemeral: true
        })
    }
}