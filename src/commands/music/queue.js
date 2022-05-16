const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const load = require("lodash");
const {convertTime} = require("../../utils/convert.js");
const {progressbar} = require("../../utils/progressbar.js");

module.exports = class ResumeCommand extends BaseCommand {
    constructor() {
        super('queue', 'music', []);
    }

    async run(client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const song = player.queue.current;

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({embeds: [thing]});
            }

            if (player.queue.length === "0" || !player.queue.length) {
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(player.position)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}`)
                    .setThumbnail(player.queue.current.thumbnail);
                await message.channel.send({embeds: [embed]});
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

                if (player.queue.size < 11) {
                    const embed = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`🎶 Currently playing ${song.title} requested from ${song.requester}
                                    ${convertTime(player.position)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}
                                    ${pages[page]}
                                    `)
                        .setThumbnail(player.queue.current.thumbnail)
                        .setTitle(`Current queue for ${message.guild.name}`);

                    await message.channel.send({
                        embeds: [embed],
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
                        .setTitle(`Current queue for ${message.guild.name}`);

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

                    const msg = await message.channel.send({
                        embeds: [embed2],
                        components: [row1],
                    });

                    const collector = msg.createMessageComponentCollector({
                        filter: (b) => {
                            if (b.user.id === message.author.id) return true;
                            else {
                                b.reply({
                                    ephemeral: true,
                                    content: "Wrong button"

                                });
                                return false;
                            }
                        },
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
                                .setTitle(`Current queue for ${message.guild.name}`);

                            await msg.edit({
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
                                .setTitle(`Current queue for ${message.guild.name}`);


                            await msg.edit({
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
                        await message.delete();
                        await msg.delete();
                    });
                }
            }
        }
        else message.channel.send('There is no active music bot.')
    }
}