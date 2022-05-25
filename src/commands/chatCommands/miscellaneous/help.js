const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const BaseCommand = require("../../../utils/structures/BaseCommand");

module.exports = class help extends BaseCommand {
    constructor() {
        super('help', 'moderation', ['h', 'botinfo']);
    }

    async run(client, message) {
        const lang = client.langs.get(message.guild.id);
        const { help } = require(`../../../utils/langs/${lang}.json`)

        const prefix = client.guildCommandPrefixes.get(message.guild.id)

        const mainEmbed = new MessageEmbed()
            .setTitle(`Main help page for ${message.guild.name}`)
            .setColor('#0050ff')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL({dynamic: true})
            })
            .setTimestamp()
            .setDescription(`${help.main.replaceAll('§prefix§', prefix)}
            
                            ${help.urgent}
                            
                            ${help.interactive}
                            `);

        const musicBut = new MessageButton()
            .setCustomId('music')
            .setLabel('music')
            .setStyle('PRIMARY');

        const modBut = new MessageButton()
            .setCustomId('moderation')
            .setLabel('moderation')
            .setStyle('PRIMARY');

        const mainBut = new MessageButton()
            .setCustomId('main')
            .setLabel('main')
            .setStyle('PRIMARY');

        const playlistBut = new MessageButton()
            .setCustomId('playlist')
            .setLabel('playlist')
            .setStyle("PRIMARY");

        const github = new MessageButton()
            .setLabel('GitHub')
            .setStyle("LINK")
            .setURL('https://github.com/jonaskroedel/orangedb#readme')

        const row1 = new MessageActionRow().addComponents([mainBut, modBut, musicBut, playlistBut, github])

        const msg = await message.channel.send({
            embeds: [mainEmbed],
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
            time: 12e4,
            idle: 30e3,
        });

        collector.on("collect", async (button) => {
            if (button.customId === "main") {
                await button.deferUpdate().catch(() => {
                });

                await msg.edit({
                    embeds: [mainEmbed],
                    components: [row1],
                });
            } else if (button.customId === "moderation") {
                await button.deferUpdate().catch(() => {
                });

                const embedMod = new MessageEmbed()
                    .setTitle(`Moderation help page for ${message.guild.name}`)
                    .setColor('#fa0442')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter({
                        text: `Requested by ${message.author.username}`,
                        iconURL: message.author.displayAvatarURL({dynamic: true})
                    })
                    .setTimestamp()
                    .setDescription(help.moderation.replaceAll('§prefix§', prefix));

                await msg.edit({
                    embeds: [embedMod],
                    components: [row1],
                });
            } else if (button.customId === 'music') {
                await button.deferUpdate().catch(() => {
                });

                const embedMusic = new MessageEmbed()
                    .setTitle(`Music help page for ${message.guild.name}`)
                    .setColor('#a7ff04')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter({
                        text: `Requested by ${message.author.username}`,
                        iconURL: message.author.displayAvatarURL({dynamic: true})
                    })
                    .setTimestamp()
                    .setDescription(help.music.replaceAll('§prefix§', prefix));

                await msg.edit({
                    embeds: [embedMusic],
                    components: [row1],
                });
            } else if (button.customId === 'playlist') {
                await button.deferUpdate().catch(() => {
                });
                const embedPlaylist = new MessageEmbed()
                    .setTitle(`Playlist help page for ${message.guild.name}`)
                    .setColor('#0bd4ef')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter({
                        text: `Requested by ${message.author.username}`,
                        iconURL: message.author.displayAvatarURL({dynamic: true})
                    })
                    .setTimestamp()
                    .setDescription(help.playlist.replaceAll('§prefix§', prefix));

                await msg.edit({
                    embeds: [embedPlaylist],
                    components: [row1],
                });
            }
        });
        collector.on("end", async () => {
            await message.delete();
            await msg.delete();
        });
    }
}