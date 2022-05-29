const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = class LyrisCommand extends BaseCommand {
    constructor() {
        super('lyrics', 'music', ['l']);
    }

    async run(client, message, args) {
        const lang = client.langs.get(message.guild.id);
        const { lyr, musicdefault, permissions } = require(`../../../utils/langs/${lang}.json`)
        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const queue = player.queue.current;
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(musicdefault.no_bot);
                return message.reply({embeds: [thing]});
            }
            let lyrics = null;
            try {
                lyrics = await lyricsFinder(queue.title, "");
                if (!lyrics) lyrics = lyr.notfound;
            } catch (error) {
                lyrics = lyrics.notfound;
            }

            let pages = Math.ceil(lyrics.length / 2040);
            let page = 0
            let pagedLyrics = [];

            for (let i = 0; i <= lyrics.length; i++) {
                pagedLyrics.push(lyrics.toString().substring(i * 2040, (i + 1) * 2040))
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
                                content: permissions.no_allowed
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
        } else return message.channel.send(musicdefault.no_bot)
    }
}