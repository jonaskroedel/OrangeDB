const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Shows the lyrics from the current song if available'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            const queue = player.queue.current;
            if (!player.queue.current) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

            let lyrics = null;

            try {
                lyrics = await lyricsFinder(queue.title, "");
                if (!lyrics) lyrics = "lyrics not found";
            } catch (error) {
                lyrics = "lyrics not found";
            }

            let pages = Math.ceil(lyrics.length / 2040);
            let page = 0
            let pagedLyrics = [];

            for (let i = 0; i <= lyrics.length; i++) {
                pagedLyrics.push(lyrics.toString().substring(i * 2040, (i + 1) * 2040))
            }

            if (!player.queue.current) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            if (lyrics.length <= 2040) {
                const embed = new MessageEmbed()
                    .setTitle(`${player.queue.current.title}`)
                    .setDescription(`${pagedLyrics[page]}...`)
                    .setColor("#F8AA2A")
                    .setThumbnail(player.queue.current.thumbnail);

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else {

                const embed2 = new MessageEmbed()
                    .setTitle(`${player.queue.current.title}`)
                    .setDescription(`${pagedLyrics[page]}...`)
                    .setColor("#F8AA2A")
                    .setThumbnail(player.queue.current.thumbnail);

                const but1 = new MessageButton()
                    .setCustomId("lyrics_cmd_but_1")
                    .setEmoji("⏭")
                    .setStyle("PRIMARY");

                const but2 = new MessageButton()
                    .setCustomId("lyrics_cmd_but_2")
                    .setEmoji("⏮")
                    .setStyle("PRIMARY");

                const but3 = new MessageButton()
                    .setCustomId("lyrics_cmd_but_3")
                    .setLabel(`${page + 1}/${pages}`)
                    .setStyle("SECONDARY")
                    .setDisabled(true);

                const row1 = new MessageActionRow().addComponents([but2, but3, but1]);

                await interaction.reply({
                    embeds: [embed2],
                    components: [row1],
                    ephemeral: true
                });
                const collector = interaction.channel.createMessageComponentCollector({
                    time: player.queue.current.duration,
                    idle: player.queue.current.duration,
                });

                collector.on('collect', async (button) => {
                    if (button.customId === 'lyrics_cmd_but_1') {
                        await button.deferUpdate().catch(() => {
                        });
                        page = page + 1 < pages ? ++page : 0;

                        const embed3 = new MessageEmbed()
                            .setTitle(`${player.queue.current.title}`)
                            .setDescription(`${pagedLyrics[page]}...`)
                            .setColor("#F8AA2A")
                            .setThumbnail(player.queue.current.thumbnail);

                        await interaction.editReply({
                            embeds: [embed3],
                            components: [
                                new MessageActionRow().addComponents(
                                    but2,
                                    but3.setLabel(`${page + 1}/${pages}`),
                                    but1
                                ),
                            ],
                        });
                    } else if (button.customId === 'lyrics_cmd_but_2') {
                        await button.deferUpdate().catch(() => {
                        });
                        page = page > 0 ? --page : pages - 1;

                        const embed4 = new MessageEmbed()
                            .setTitle(`${player.queue.current.title}`)
                            .setDescription(`${pagedLyrics[page]}...`)
                            .setColor("#F8AA2A")
                            .setThumbnail(player.queue.current.thumbnail);

                        await interaction.editReply({
                            embeds: [embed4],
                            components: [
                                new MessageActionRow().addComponents(
                                    but2,
                                    but3.setLabel(`${page + 1}/${pages}`),
                                    but1
                                ),
                            ],
                        });
                    } else return;
                });

                collector.on("end", async () => {
                    await interaction.editReply({
                        components: []
                    })
                });
            }
        } else return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}