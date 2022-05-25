const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const load = require("lodash");
const {convertTime} = require("../../utils/convert.js");
const {progressbar} = require("../../utils/progressbar.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the current queue'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            const song = player.queue.current;

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            if (player.queue.length === "0" || !player.queue.length) {
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(player.position)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}`)
                    .setThumbnail(player.queue.current.thumbnail)
                    .setTitle(`Current queue for ${interaction.guild.name} - ${convertTime(song.duration)}`);
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else {
                const queuedSongs = player.queue.map(
                    (t, i) =>
                        `\`${++i}\` • ${t.title} • \`[${convertTime(t.duration)}]\` • [${
                            t.requester
                        }]`
                );

                const mapping = load.chunk(queuedSongs, 10);
                const pages = mapping.map((s) => s.join("\n"));
                let page = 0;
                let time = player.queue.current.duration;
                for (let i = 0; i < player.queue.size; i++) {
                    time += player.queue[i].duration;
                }

                if (player.queue.size < 11) {
                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(player.position)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}
                                    ${pages[page]}
                                    `)
                        .setThumbnail(player.queue.current.thumbnail)
                        .setTitle(`Current queue for ${interaction.guild.name} - ${convertTime(time)}`);

                    await interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    });
                } else {
                    const embed2 = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(player.position)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}
                                    ${pages[page]}
                                    `)
                        .setThumbnail(player.queue.current.thumbnail)
                        .setTitle(`Current queue for ${interaction.guild.name} - ${convertTime(time)}`);

                    const but1 = new MessageButton()
                        .setCustomId("queue_cmd_but_1")
                        .setEmoji("⏭")
                        .setStyle("PRIMARY");

                    const but2 = new MessageButton()
                        .setCustomId("queue_cmd_but_2")
                        .setEmoji("⏮")
                        .setStyle("PRIMARY");

                    const but3 = new MessageButton()
                        .setCustomId("queue_cmd_but_3")
                        .setLabel(`${page + 1}/${pages.length}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true);

                    const row1 = new MessageActionRow().addComponents([but2, but3, but1]);

                    await interaction.reply({
                        embeds: [embed2],
                        components: [row1],
                        ephemeral: true
                    });

                    const collector = interaction.channel.createMessageComponentCollector({
                        time: 60000 * 5,
                        idle: 30e3,
                    });

                    collector.on("collect", async (button) => {
                        if (button.customId === "queue_cmd_but_1") {
                            await button.deferUpdate().catch(() => {
                            });
                            page = page + 1 < pages.length ? ++page : 0;

                            const embed3 = new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(song.duration)}
                                    ${progressbar(player)}
                                    ${pages[page]}
                                    `)
                                .setThumbnail(player.queue.current.thumbnail)
                                .setTitle(`Current queue for ${interaction.guild.name} - ${convertTime(time)}`);

                            await interaction.editReply({
                                embeds: [embed3],
                                components: [
                                    new MessageActionRow().addComponents(
                                        but2,
                                        but3.setLabel(`${page + 1}/${pages.length}`),
                                        but1
                                    ),
                                ],
                            });
                        } else if (button.customId === "queue_cmd_but_2") {
                            await button.deferUpdate().catch(() => {
                            });
                            page = page > 0 ? --page : pages.length - 1;

                            const embed4 = new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(song.duration)}
                                    ${progressbar(player)}
                                    ${pages[page]}
                                    `)
                                .setThumbnail(player.queue.current.thumbnail)
                                .setTitle(`Current queue for ${interaction.guild.name} - ${convertTime(time)}`);


                            await interaction.editReply({
                                embeds: [embed4],
                                components: [
                                    new MessageActionRow().addComponents(
                                        but2,
                                        but3.setLabel(
                                            `${page + 1}/${pages.length}`
                                        ),
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
            }
        } else return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}