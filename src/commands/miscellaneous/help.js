const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js');
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

const guildCommandPrefixes = new Map();

module.exports = class help extends BaseCommand {
    constructor() {
        super('help', 'moderation', ['h', 'botinfo']);
        this.connection = StateManager.connection;
    }

    async run(client, message) {

        const prefix = guildCommandPrefixes.get(message.guild.id)

        const mainEmbed = new MessageEmbed()
            .setTitle(`Main help page for ${message.guild.name}`)
            .setColor('#0050ff')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL({dynamic: true})
            })
            .setTimestamp()
            .setDescription(`**${prefix}help** -- shows this page
                            **${prefix}reddit** -- sends a meme from the default reddit or custom one
                            
                            Interactive help page, click on the buttons below to access the help page for the respective category
                            You can find a detailed information sheet with all commands [here](https://github.com/jonaskroedel/OrangeDB/blob/master/COMMANDS.md#detailed-page-for-all-commands).
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
                    .setDescription(`**${prefix}prefix [prefix]** -- changes the current prefix
                                    **${prefix}ping** -- shows the bot latency in \`ms\`
                                    **${prefix}userinfo** -- userinfo from you or the mentioned player
                                    **${prefix}clear [amount]** -- clears [amount] of messages in the current channel
                                    **${prefix}clearchannel** -- clears the whole channel
                                    **${prefix}subreddit [subreddit]** -- changes the default subreddit
                                    **${prefix}welcome [channel] / remove** -- adds, changes or deletes the default welcome channel
                                    `);

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
                    .setDescription(`**${prefix}join** -- joins your current voice-channel
                                    **${prefix}play** -- plays music depending on url/author/title (only youtube.com)
                                    **${prefix}pause** -- pauses the current song
                                    **${prefix}resume** -- resumes the current song
                                    **${prefix}stop** -- stops the song
                                    **${prefix}24/7** -- plays music 24/7 (music must be given)
                                    **${prefix}autoplay** -- adds appropriate songs to the queue
                                    **${prefix}skip** -- skips the queue to the next song
                                    **${prefix}skipTo [number]** -- skips the queue to the requested song 
                                    **${prefix}queue** -- shows the current queue
                                    **${prefix}shuffle** -- shuffles the queue
                                    **${prefix}now** -- shows the current song
                                    **${prefix}loop [track/queue]** -- loops either track or queue
                                    **${prefix}remove [number]** -- clears the [number] song in the queue
                                    **${prefix}lyrics** -- shows the lyrics to the song
                                    **${prefix}clearqueue** -- clears the whole queue
                                    **${prefix}volume** -- sets the volume between 100 and 0 
                                    **${prefix}leave** -- leaves the voicechannel`);

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
                    .setDescription(`**${prefix}create [name]** -- creates a playlist
                                    **${prefix}save [name]** -- saves your current queue to a playlist
                                    **${prefix}load [name]** -- loads a playlist
                                    **${prefix}delete [name]** -- deletes a playlist
                                    **${prefix}playlists** -- shows all your playlists`);

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
StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('guildAdded', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});