const {Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
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
            .setColor('#e45e81')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL({dynamic: true})
            })
            .setTimestamp()
            .setDescription(`**${prefix}help** -- shows this page
                            
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

        const row1 = new MessageActionRow().addComponents([mainBut, modBut, musicBut])

        const msg = await message.channel.send({
            embeds: [mainEmbed],
            components: [row1],
        });

        const collector = message.channel.createMessageComponentCollector({
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
            time: 60000 * 5,
            idle: 30e3,
        });

        collector.on("collect", async (button) => {
            if (button.customId === "main") {
                await button.deferUpdate().catch(() => {
                });

                await msg.edit({
                    embeds: [mainEmbed],
                    components: [
                        new MessageActionRow().addComponents(
                            mainBut,
                            modBut,
                            musicBut
                        ),
                    ],
                });
            } else if (button.customId === "moderation") {
                await button.deferUpdate().catch(() => {
                });

                const embedMod = new MessageEmbed()
                    .setTitle(`Moderation help page for ${message.guild.name}`)
                    .setColor('#e45e81')
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
                                    `);

                await msg.edit({
                    embeds: [embedMod],
                    components: [
                        new MessageActionRow().addComponents(
                            mainBut,
                            modBut,
                            musicBut
                        ),
                    ],
                });
            } else if (button.customId === 'music') {
                await button.deferUpdate().catch(() => {
                });

                const embedMusic = new MessageEmbed()
                    .setTitle(`Music help page for ${message.guild.name}`)
                    .setColor('#e45e81')
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
                                    **${prefix}autoplay** -- adds appropriate songs to the queue (still in development)
                                    **${prefix}skip** -- skips the queue to the next song
                                    **${prefix}queue** -- shows the current queue
                                    **${prefix}now** -- shows the current song
                                    **${prefix}remove [number]** -- clears the [number] song in the queue
                                    **${prefix}lyrics** -- shows the lyrics to the song
                                    **${prefix}clearqueue** -- clears the whole queue
                                    **${prefix}leave** -- leaves the voicechannel`);

                await msg.edit({
                    embeds: [embedMusic],
                    components: [
                        new MessageActionRow().addComponents(
                            mainBut,
                            modBut,
                            musicBut
                        ),
                    ],
                });
            } else return;
        });

        collector.on("end", async () => {
            await msg.edit({
                components: [],
            });
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