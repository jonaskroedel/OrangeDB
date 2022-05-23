const {MessageEmbed} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('resumes the current song.'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            const song = player.queue.current;

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

                if (!player.paused) {
                    let thing = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`❌ Music Bot is not paused
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`)
                        .setThumbnail(player.queue.current.thumbnail);
                    return interaction.reply({
                        embeds: [thing],
                        ephemeral: true
                    });
                }

                player.pause(false);

                let thing = new MessageEmbed()
                    .setDescription(
                        `✅ Music Bot successfully resumed! Playing: 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                    )
                    .setColor("GREEN")
                    .setThumbnail(player.queue.current.thumbnail);
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            } else return interaction.reply({
                content: 'There is no active music bot!',
                ephemeral: true
            });
        }
    }
}