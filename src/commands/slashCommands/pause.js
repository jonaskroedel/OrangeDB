const { MessageEmbed } = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song.'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            const song = player.queue.current;

            if (player.paused) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ Music Bot is already paused 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`)
                    .setThumbnail(player.queue.current.thumbnail);
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            await player.pause(true);
            let embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `❌ Music Bot paused 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                )
                .setThumbnail(player.queue.current.thumbnail);
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}