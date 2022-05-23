const { MessageEmbed } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { progressbar } = require("../../utils/progressbar.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('now')
        .setDescription('Shows the current song playing'),

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
            const song = player.queue.current;
            const current = player.position;

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(current)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}`)
                .setThumbnail(player.queue.current.thumbnail);
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
        else return interaction.reply({
            content: 'There is no active music bot.',
            ephemeral: true
        })
    }
}