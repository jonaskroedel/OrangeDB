const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const {convertTime} = require("../../utils/convert");
const {progressbar} = require("../../utils/progressbar");

module.exports = class LyrisCommand extends BaseCommand {
    constructor() {
        super('lyrics', 'music', ['l']);
    }

    async run(client, message, args) {
        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const queue = player.queue.current;
            if (!queue) return message.channel.send(("There is no active Music Bot")).catch(console.error);

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
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({embeds: [thing]});
            }
            if (lyrics.length <= 2040) {
                const embed = new MessageEmbed()
                    .setTitle(`${player.queue.current.title}`)
                    .setDescription(`${pagedLyrics[page]}...`)
                    .setColor("#F8AA2A")
                    .setThumbnail(player.queue.current.thumbnail);

                message.channel.send({
                    embeds: [embed],
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
                                content: "You're not allowed to use that command!"
                            });
                            return false;
                        }
                    },
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

                        await msg.edit({
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

                        await msg.edit({
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
                    await message.delete();
                    await msg.delete();
                });
            }
        } else message.channel.send('There is no active music bot.');
    }
}