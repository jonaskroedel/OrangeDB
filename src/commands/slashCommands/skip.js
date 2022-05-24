const {MessageEmbed} = require("discord.js");

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            player.stop();


            let song = player.queue[0];

            if (song) {
                let thing = new MessageEmbed()
                    .setDescription(
                        `Playing: 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                    )
                    .setColor("GREEN")
                    .setThumbnail(song.thumbnail);
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }
            interaction.reply({
                content: 'There is no next song.',
                ephemeral: true
            })
        } else return interaction.reply({
            content: 'There is no active music bot.',
            ephemeral: true
        })
    }
}